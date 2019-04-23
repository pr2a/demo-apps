package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path"
	"time"

	"github.com/harmony-one/demo-apps/backend/client"
	"github.com/harmony-one/demo-apps/backend/db"
	"google.golang.org/appengine"
	"google.golang.org/appengine/mail"
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
	collection = flag.String("collection", "players", "name of collection")
	key        = flag.String("key", "./keys/leo_account_key.json", "key filename")
	project    = flag.String("project", "lottery-demo-leo", "project ID of firebase")
	ip         = flag.String("server_ip", "34.222.210.98", "the IP address of the server")

	versionFlag = flag.Bool("version", false, "Output version info")
)

const (
	port = "30000"
)

func main() {
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/pickwinner", pickWinnerHandler)

	appengine.Main()
}

// indexHandler responds to requests with our greeting.
func indexHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	fmt.Fprint(w, "Hello, World!")
}

// pickWinnerHandler responds to requests for the pick winner cron job.
func pickWinnerHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/pickwinner" {
		http.NotFound(w, r)
		return
	}
	pickWinner(w, r)
}

func pickWinner(w http.ResponseWriter, r *http.Request) {
	flag.Parse()
	if *versionFlag {
		printVersion(os.Args[0])
	}

	fdb, err := fdb.NewFdb(*key, *project)

	if err != nil {
		log.Fatalf("Failed to create Fdb client: %v", err)
		os.Exit(1)
	}

	// Close FDB when done.
	defer fdb.CloseFdb()

	fdb.GetPlayers(true)

	player, err := restclient.GetPlayer(*ip, port)
	if err != nil {
		log.Fatalf("GetPlayer Error: %v", err)
	} else {
		log.Printf("Player: %v\n", player)
	}

	winner, err := restclient.GetWinner(*ip, port)
	if err != nil {
		log.Fatalf("GetWinner Error: %v", err)
	} else {
		log.Printf("Winner: %v\n", winner)
	}

	// wait for the execution of smart contracts
	time.Sleep(2 * time.Second)

	player, err = restclient.GetPlayer(*ip, port)
	if err != nil {
		log.Fatalf("GetPlayer Error: %v", err)
	} else {
		log.Printf("Player: %v\n", player)
	}

	keys, ok := r.URL.Query()["email"]
	email := "rongjian@harmony.one"
	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'email' is missing")
	} else {
		email = keys[0]
	}

	sendEmail([]string{email}, r)

	fmt.Fprint(w, "Winner email sent!")
}

func sendEmail(recipients []string, r *http.Request) {
	ctx := appengine.NewContext(r)
	msg := &mail.Message{
		Sender:  "admin@harmony-lottery-app.appspotmail.com",
		To:      recipients,
		Subject: "Lottery Winner is Picked!!!",
		Body:    "You are the winner!!!",
	}
	log.Printf("Sending email: %s", msg)
	if err := mail.Send(ctx, msg); err != nil {
		log.Println(ctx, "Couldn't send email", err)
	}
}
