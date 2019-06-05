package main

import (
	"bytes"
	"context"
	"crypto/md5"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"mime"
	"net/http"
	"net/mail"
	"os"
	"path"
	"strconv"
	"strings"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/gorilla/mux"
	"google.golang.org/appengine"
	app_log "google.golang.org/appengine/log"

	restclient "github.com/harmony-one/demo-apps/backend/client"
	fdb "github.com/harmony-one/demo-apps/backend/db"
	"github.com/harmony-one/demo-apps/backend/p2p"
	"github.com/harmony-one/demo-apps/backend/utils"
)

var (
	version string
	builtBy string
	builtAt string
	commit  string
)

func printVersion(me string) {
	fmt.Fprintf(os.Stderr, "Harmony (C) 2019. %v, version %v-%v (%v %v)\n", path.Base(me), version, commit, builtBy, builtAt)
	os.Exit(0)
}

var (
	defaultConfigFile = "./puzzle/puzzle_backend/.hmy/backend.ini"
	defaultProfile    = "default"
	defaultPort       = "30000"
	leader            p2p.Peer
	backendProfile    *utils.BackendProfile

	db *fdb.Fdb

	profile     = flag.String("profile", defaultProfile, "name of the profile")
	versionFlag = flag.Bool("version", false, "Output version info")
)

const (
	adminKey  = "e401343197a852f361e38ce6b46c99f1d6d1f80499864c6ae7effee42b46ab6b"
	dbKeyFile = "./puzzle/puzzle_backend/keys/benchmark-firebase-db-key.json"
	dbProject = "benchmark-209420"
)

// readProfile read the ini file and return the leader's IP
func readProfile(profile string) p2p.Peer {
	fmt.Printf("Using %s profile for backend\n", profile)
	var err error
	backendProfile, err = utils.ReadBackendProfile(defaultConfigFile, profile)
	if err != nil {
		fmt.Printf("Read backend profile error: %v\nExiting ...\n", err)
		os.Exit(2)
	}

	return backendProfile.RPCLeader[0]
}

func main() {
	flag.Parse()
	if *versionFlag {
		printVersion(os.Args[0])
	}

	var err error
	db, err = fdb.NewFdb(dbKeyFile, dbProject)
	if err != nil || db == nil {
		log.Fatalf("Failed to create Fdb client: %v", err)
	}
	defer db.CloseFdb()

	r := mux.NewRouter()

	r.HandleFunc("/reg", handlePostReg)
	r.HandleFunc("/play", handlePostPlay)
	r.HandleFunc("/finish", handlePostFinish)
	r.HandleFunc("/user/{key}/email", handleUserEmail)
	r.HandleFunc("/user/{key}/coupon", handleUserCoupon)

	http.Handle("/", r)

	leader = readProfile(*profile)

	leaders := make([]p2p.Peer, 0)
	for _, ldr := range backendProfile.RPCLeader {
		leaders = append(leaders, p2p.Peer{IP: ldr.IP, Port: defaultPort})
	}
	restclient.SetLeaders(leaders)

	appengine.Main()
}

type cosGetUIDRequestBody struct {
	Token     string `json:"token"`     // Temporary COS login token.
	Timestamp int64  `json:"timestamp"` // Current UNIX timestamp, in ms.
	ClientID  string `json:"client_id"` // App-specific client ID.
}

type cosGetUIDResponseBodyData struct {
	UID string `json:"uid"` // COS UID.
}

type cosGetUIDResponseBody struct {
	Status  int64                     `json:"status"`  // Status code.
	Message string                    `json:"message"` // Status message.
	Data    cosGetUIDResponseBodyData `json:"data"`    // Data (“meat”).
}

type getUIDError struct {
	Status  int64
	Message string
}

//EmailField to get email
type EmailField struct {
	Email string
}

//CouponField to get coupon
type CouponField struct {
	Coupon string
}

func (e *getUIDError) Error() string {
	return fmt.Sprintf("get_uid failed with status=%#v message=%#v",
		e.Status, e.Message)
}

func getUID(token string) (string, error) {
	ts := int64(time.Now().UnixNano() / 1000000)
	reqBodyBytes, err := json.Marshal(cosGetUIDRequestBody{
		Token:     token,
		Timestamp: ts,
		ClientID:  "3",
	})
	if err != nil {
		return "", err
	}

	h := md5.New()
	h.Write([]byte("5VCjkUpHkueWo77S1TJC8d3dAgDry0pitRIGliIbucE=")) // TODO ek parametrize
	h.Write(reqBodyBytes)
	if _, err := fmt.Fprint(h, ts); err != nil {
		return "", err
	}
	auth := hexutil.Encode(h.Sum(nil))[2:]

	cosClient := &http.Client{}
	req, err := http.NewRequest(
		"POST",
		"http://qa.contentos.io/api/v1/open/get_uid",
		bytes.NewReader(reqBodyBytes),
	)
	if err != nil {
		return "", err
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", auth)

	res, err := cosClient.Do(req)
	if err != nil {
		return "", err
	}

	defer func() { _ = res.Body.Close() }()
	resBodyBytes, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return "", err
	}
	resBody := cosGetUIDResponseBody{}
	err = json.Unmarshal(resBodyBytes, &resBody)
	if err != nil {
		return "", err
	}
	if resBody.Status != 1 {
		return "", &getUIDError{resBody.Status, resBody.Message}
	}
	return resBody.Data.UID, nil
}

func getRandomFakeUID() string {
	var bytes []byte
	for i := 0; i < 16; i++ {
		bytes = append(bytes, byte(rand.Intn(256)))
	}
	return hexutil.Encode(bytes[:])
}

type msgBody struct {
	Msg string `json:"msg"`
}

type postRegResponseBody struct {
	Account string `json:"address"`
	PrivKey string `json:"privkey"`
	Email   string `json:"email"`
	UID     string `json:"uid"`
	Txid    string `json:"txid"`
	Balance string `json:"balance"`
}

func handlePostReg(w http.ResponseWriter, r *http.Request) {
	allowCORS(w)
	ctx := appengine.NewContext(r)
	if r.URL.Path != "/reg" {
		http.NotFound(w, r)
		return
	}

	switch strings.ToUpper(r.Method) {
	case "OPTIONS":
		return
	case "POST":
	default:
		sendMethodNotAllowed(w, "POST", "OPTIONS")
		return
	}

	q := r.URL.Query()

	var err error
	var uid string
	var account *fdb.PzPlayer
	var accounts []*fdb.PzPlayer
	if tokens, ok := q["token"]; !ok {
		app_log.Infof(ctx, "handlePostReg: no token; entering guest mode")
		uid = ""
	} else {
		token := tokens[0]
		uid, err = getUID(token)
		if err != nil {
			app_log.Infof(ctx, "handlePostReg: getUID returned %v", err)
			http.Error(w, "", http.StatusUnauthorized)
			return
		}
		app_log.Infof(ctx, "handlePostReg: UID %#v logging in", uid)
		// find the existing account from firebase DB
		accounts = db.FindAccount("cosid", uid)
	}

	rpcDone := make(chan (restclient.RPCMsg))
	resBody := postRegResponseBody{UID: uid}
	var resCode int
	if len(accounts) == 0 {
		// didn't find the account (uid != "") or guest mode (uid == "")
		// generate the key
		resBody.Account, resBody.PrivKey = utils.GenereateKeys()
		// TODO ek – fix this later somehow...
		resBody.Balance = "100000000000000000000"
		leader := restclient.PickALeader()

		go restclient.FundMe(leader, resBody.Account, rpcDone)

		// register the new account
		var cosid string
		if uid == "" {
			// guest mode; try to create a unique account
			cosid = getRandomFakeUID()
			app_log.Infof(ctx, "handlePostReg: using guest UID %#v", cosid)
		} else {
			cosid = uid
		}
		player := fdb.PzPlayer{
			Email:   "",
			CosID:   cosid,
			PrivKey: resBody.PrivKey,
			Address: resBody.Account,
			Leader:  leader.IP,
			Port:    leader.Port,
		}
		err := db.RegisterAccount(&player)
		if err != nil {
			app_log.Infof(ctx, "handlePostReg registerAccount error: %v", err)
			http.Error(w, "register account failure", http.StatusServiceUnavailable)
			return
		}
		account = &player
		app_log.Infof(ctx, "handlePostReg: register new Account: %v for cosid: %v", account, uid)
		if msg := <-rpcDone; msg.Err != nil {
			http.Error(w, "fund me failure", http.StatusGatewayTimeout)
			return
		} else {
			app_log.Infof(ctx,
				"handlePostReg: account %v has been funded in Tx %v",
				resBody.Account, msg.Txid)
			resBody.Txid = msg.Txid
		}

		//TODO: send email to player
		go func() {
			app_log.Infof(ctx, "Sent email ..")
		}()

		resCode = http.StatusCreated
	} else {
		// we should find only one account, if more than one, just get the first one
		account = accounts[0]
		resBody.Account = account.Address
		resBody.PrivKey = account.PrivKey
		resBody.Email = account.Email
		resCode = http.StatusOK

		leader = p2p.Peer{
			IP:   account.Leader,
			Port: account.Port,
		}

		chanBalanceMsg := make(chan restclient.AccountBalanceMsg)
		go restclient.GetBalance(leader, account.Address, chanBalanceMsg)
		balanceMsg := <-chanBalanceMsg
		if balanceMsg.Err != nil {
			app_log.Infof(ctx, "get balance failure: %#v", balanceMsg.Err)
			http.Error(w, "get balance failure", http.StatusGatewayTimeout)
			return
		}
		resBody.Balance = balanceMsg.Balance
	}

	jsonResp(ctx, w, resCode, resBody)
}

type postPlayResponseBody struct {
	Txid string `json:"txid"`
}

func handlePostPlay(w http.ResponseWriter, r *http.Request) {
	allowCORS(w)

	ctx := appengine.NewContext(r)
	if r.URL.Path != "/play" {
		http.NotFound(w, r)
		return
	}

	switch strings.ToUpper(r.Method) {
	case "OPTIONS":
		return
	case "POST":
	default:
		sendMethodNotAllowed(w, "POST", "OPTIONS")
		return
	}

	q := r.URL.Query()

	keys, ok := q["accountKey"]
	if !ok {
		http.Error(w, "missing account key", http.StatusBadRequest)
		return
	}
	key := keys[0]
	stakes, ok := q["stake"]
	if !ok {
		http.Error(w, "missing account key", http.StatusBadRequest)
		return
	}
	stake := stakes[0]

	// find the existing account from firebase DB
	accounts := db.FindAccount("privkey", key)

	// can't play if player didn't register before
	if len(accounts) == 0 {
		http.NotFound(w, r)
		return
	}
	account := accounts[0]
	app_log.Infof(ctx, "player: %v is about to play", account.Address)
	leader := p2p.Peer{
		IP:   account.Leader,
		Port: account.Port,
	}

	rpcDone := make(chan (restclient.RPCMsg))
	go restclient.PlayGame(leader, key, fmt.Sprintf("%v", stake), rpcDone)
	msg := <-rpcDone
	if msg.Err != nil {
		app_log.Infof(ctx, "playHandler PlayGame failed: %v", msg.Err)
		http.Error(w, "play failure", http.StatusGatewayTimeout)
		return
	}

	jsonResp(ctx, w, http.StatusCreated, &postPlayResponseBody{
		Txid: msg.Txid,
	})
}

type postFinishResponseBody struct {
	Reward string `json:"reward"`
	Txid   string `json:"txid"`
}

func handlePostFinish(w http.ResponseWriter, r *http.Request) {
	allowCORS(w)
	ctx := appengine.NewContext(r)
	if r.URL.Path != "/finish" {
		http.NotFound(w, r)
		return
	}

	switch strings.ToUpper(r.Method) {
	case "OPTIONS":
		return
	case "POST":
	default:
		sendMethodNotAllowed(w, "POST", "OPTIONS")
		return
	}

	q := r.URL.Query()

	keys, ok := q["accountKey"]
	if !ok {
		http.Error(w, "missing account key", http.StatusBadRequest)
		return
	}
	key := keys[0]

	heightStrs, ok := q["height"]
	if !ok {
		http.Error(w, "missing height", http.StatusBadRequest)
		return
	}
	height, err := strconv.ParseInt(heightStrs[0], 10, 64)
	if err != nil {
		http.Error(w, "invalid height", http.StatusBadRequest)
		return
	}

	sequences, ok := q["sequence"]
	if !ok {
		http.Error(w, "missing sequence", http.StatusBadRequest)
		return
	}
	sequence := sequences[0]

	// find the existing account from firebase DB
	accounts := db.FindAccount("privkey", key)

	// can't play if player didn't register before
	if len(accounts) == 0 {
		http.NotFound(w, r)
		return
	}

	account := accounts[0]
	app_log.Infof(ctx, "player: %v/%v is about to get paid", account.Address, height)

	leader := p2p.Peer{
		IP:   account.Leader,
		Port: account.Port,
	}

	rpcDone := make(chan (restclient.RPCMsg))
	go restclient.PayOut(leader, key, height, sequence, rpcDone)
	msg := <-rpcDone

	if msg.Err != nil {
		app_log.Infof(ctx, "/finish PayOut failed: %v", msg.Err)
		http.Error(w, "payout failure", http.StatusGatewayTimeout)
		return
	}
	//
	//rpcEndDone := make(chan (restclient.RPCMsg))
	//go restclient.EndGame(leader, key, rpcEndDone)
	//msgEnd := <-rpcEndDone
	//
	//if msgEnd.Err != nil {
	//	app_log.Infof(ctx, "/finish EndGame failed: %v", msgEnd.Err)
	//	http.Error(w, "endgame failure", http.StatusGatewayTimeout)
	//	return
	//}

	jsonResp(ctx, w, http.StatusOK, postFinishResponseBody{
		Reward: "",
		Txid:   msg.Txid,
	})
}

type HTTPError interface {
	Code() int
	Error() string
}

type httpError struct {
	code    int
	message string
}

func (e httpError) Code() int {
	return e.code
}

func (e httpError) Error() string {
	return e.message
}

func sendError(w http.ResponseWriter, err error) {
	code := http.StatusInternalServerError
	if err, ok := err.(HTTPError); ok {
		code = err.Code()
	}
	http.Error(w, err.Error(), code)
}
func handleUserEmail(w http.ResponseWriter, r *http.Request) {
	allowCORS(w)
	ctx := appengine.NewContext(r)
	vars := mux.Vars(r)
	key := vars["key"]
	switch strings.ToUpper(r.Method) {
	case "OPTIONS":
		return
	case "PUT":
		var E EmailField
		if err := jsonRequestBody(r, &E); err != nil {
			sendError(w, err)
			return
		}
		if &E == nil {
			http.Error(w, "empty email address", http.StatusBadRequest)
			return
		}
		email, err := mail.ParseAddress(E.Email)
		if err != nil {
			http.Error(w, "invalid email address", http.StatusBadRequest)
			return
		}
		players, err := db.UpdatePzPlayers(ctx,
			func(q firestore.Query) firestore.Query {
				return q.Where("privkey", "==", key)
			},
			[]firestore.Update{
				{FieldPath: []string{"email"}, Value: email.Address},
			},
		)
		if err != nil {
			sendError(w, err)
			return
		}
		if len(players) > 0 {
			for _, player := range players {
				app_log.Debugf(ctx, "updated player %#v with email %#v",
					player, email.Address)
			}
			w.WriteHeader(http.StatusNoContent)
		} else {
			http.NotFound(w, r)
		}
	default:
		sendMethodNotAllowed(w, "POST", "OPTIONS")
	}
}

func handleUserCoupon(w http.ResponseWriter, r *http.Request) {
	allowCORS(w)
	ctx := appengine.NewContext(r)
	vars := mux.Vars(r)
	key := vars["key"]
	switch strings.ToUpper(r.Method) {
	case "OPTIONS":
		return
	case "PUT":
		var coupon CouponField
		if err := jsonRequestBody(r, &coupon); err != nil {
			sendError(w, err)
			return
		}
		if &coupon == nil {
			http.Error(w, "empty coupon string", http.StatusBadRequest)
			return
		}
		players, err := db.UpdatePzPlayers(ctx,
			func(q firestore.Query) firestore.Query {
				return q.Where("privkey", "==", key)
			},
			[]firestore.Update{
				{FieldPath: []string{"coupon"}, Value: coupon.Coupon},
			},
		)
		if err != nil {
			sendError(w, err)
			return
		}
		if len(players) > 0 {
			for _, player := range players {
				app_log.Debugf(ctx, "updated player %#v with coupon %#v",
					player, coupon.Coupon)
			}
			w.WriteHeader(http.StatusNoContent)
		} else {
			http.NotFound(w, r)
		}
	default:
		sendMethodNotAllowed(w, "POST", "OPTIONS")
	}
}

func allowCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Accept")
}

func jsonRequestBody(r *http.Request, v interface{}) error {
	if contentType, _, err := getContentType(r); err != nil {
		return err
	} else if contentType != "application/json" {
		return httpError{http.StatusBadRequest, "wrong Content-Type"}
	}
	if body, err := ioutil.ReadAll(r.Body); err != nil {
		return err
	} else if err := json.Unmarshal(body, v); err != nil {
		return httpError{http.StatusBadRequest, "cannot parse request"}
	}
	return nil
}

func getContentType(r *http.Request) (string, map[string]string, error) {
	contentTypes := r.Header[http.CanonicalHeaderKey("Content-Type")]
	switch len(contentTypes) {
	case 0:
		return "", nil, httpError{http.StatusBadRequest, "missing Content-Type"}
	case 1:
		// OK; proceed
	default:
		return "", nil, httpError{http.StatusBadRequest, "ambiguous Content-Type"}
	}
	mediaType, params, err := mime.ParseMediaType(contentTypes[0])
	if err != nil {
		return "", nil, httpError{http.StatusBadRequest, "invalid Content-Type"}
	}
	return mediaType, params, nil
}

func jsonResp(
	ctx context.Context, w http.ResponseWriter, code int, res interface{},
) {
	resBytes, err := json.Marshal(res)
	if err != nil {
		app_log.Errorf(ctx, "cannot marshal response %#v: %v", res, err)
		http.Error(w, "", http.StatusInternalServerError)
	}
	_, _ = w.Write(resBytes)
}

func sendMethodNotAllowed(w http.ResponseWriter, methods ...string) {
	w.Header().Add("Allow", strings.Join(methods, ", "))
	w.WriteHeader(http.StatusMethodNotAllowed)
}
