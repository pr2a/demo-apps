webpackJsonp([1],{"/hH2":function(t,e){},DGst:function(t,e){},DUGH:function(t,e){},DwsL:function(t,e){},ICWc:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")({name:"App"},n,!1,function(t){a("wb+E"),a("tMKh")},null,null).exports,o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"welcome-page"},[t._m(0),t._v(" "),a("button",{staticClass:"btn-primary",on:{click:function(e){return t.$emit("join")}}},[t._v("Start Game")])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content"},[e("div",{staticClass:"logo"}),this._v(" "),e("div",{staticClass:"intro-wrapper"},[e("div",{staticClass:"intro"},[e("p",[this._v("\n          The contentos harmony puzzle game utilizes fast\n          finality of the game to make it frictionless and the\n          immutability of ledger to record game state, and\n          thus enable trust between players.\n        ")]),this._v(" "),e("p",[this._v("Stake. Play. Get rewarded!")])])])])}]};var l=a("VU/8")({name:"WelcomePage",props:{},data:function(){return{}},mounted:function(){},methods:{}},o,!1,function(t){a("frv/")},"data-v-067b17f2",null).exports,r=a("woOf"),c=a.n(r),u=["#00E0FF","#482AFF","#00AEE9","#69FABD"],d=["#706B5E","white","white","#19586D"],v={name:"Chip",props:["value"],computed:{style:function(){return{fontSize:"30px",backgroundColor:this.backColor,color:this.color}},backColor:function(){return u[this.value%u.length]},color:function(){return d[this.value%d.length]}}},h={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"chip",style:this.style},[this._v(this._s(this.value))])},staticRenderFns:[]},m=a("VU/8")(v,h,!1,null,null,null).exports,f=a("oYgK");a("Ya8g");function p(t,e,a){return Math.max(e,Math.min(a,t))}var b={L:{x:0,y:-1},U:{x:-1,y:0},R:{x:0,y:1},D:{x:1,y:0}},g={37:"L",38:"U",39:"R",40:"D"},x={name:"Game",components:{Chip:m},props:{game:{contents:Array,initialSelected:{x:Number,y:Number}},gameLevel:Number,listenOwnKeyEventsOnly:{type:Boolean,default:!1},tabIndex:{type:Number,default:1},boardSizePx:{type:Number,default:0},animationTimeMs:{type:Number,default:150},gameEnded:Boolean},data:function(){return{cells:this.game.contents.slice(0),position:c()({},this.game.initialSelected),boardSizeAutoPx:0,size:3,moves:""}},mounted:function(){this.boardSizeAutoPx=this.boardSizePx>0?this.boardSizePx:this.$el.getBoundingClientRect().width,this.startGame()},computed:{index:function(){return 3*this.position.x+this.position.y},boardStyle:function(){return{width:this.boardSizePx>0?this.boardSizePx+"px":"100%",height:this.boardSizePx>0?this.boardSizePx+"px":"100%",borderRadius:7/this.size+"%"}},cellStyle:function(){return{width:this.cellSizePct+"%",height:this.cellSizePct+"%",marginLeft:this.cellMarginPct+"%",marginTop:this.cellMarginPct+"%"}},cellSizePct:function(){return 8*this.cellMarginPct},cellMarginPct:function(){return 100/(9*this.size+1)},cellSizePx:function(){return this.cellSizePct/100*(this.boardSizePx>0?this.boardSizePx:this.boardSizeAutoPx)}},watch:{gameEnded:function(t){t&&this.$emit("ended")}},methods:{startGame:function(){Object(f.playBeginSound)(),this.runKeyboardControl(this.move),this.runTouchControl(this.move)},runKeyboardControl:function(t){var e=this.listenOwnKeyEventsOnly?this.$el:document,a=function(e){var a=g[e.keyCode];null!=a&&(e.preventDefault(),Object(f.playMoveSound)(),t(a))};e.addEventListener("keydown",a),this.$once("completeLevel",function(){e.removeEventListener("keydown",a)})},runTouchControl:function(t){var e=function(t){var e,a=5;function s(t){e=t.touches[0],t.preventDefault()}function n(s){var n=s.changedTouches[0],i=e.clientX-n.clientX,o=e.clientY-n.clientY,l=Math.abs(i),r=Math.abs(o);l<a&&r<a||t(l>r?i>0?"L":"R":o>0?"U":"D")}return{attach:function(t){t.addEventListener("touchstart",s,!1),t.addEventListener("touchend",n,!1)},detach:function(t){t.removeEventListener("touchstart",s),t.removeEventListener("touchend",n)}}}(function(e){Object(f.playMoveSound)(),t(e)}),a=this.$el;e.attach(a),this.$once("completeLevel",function(){e.detach(a)})},finishLevel:function(){this.$emit("completeLevel",this.moves)},move:function(t){console.log("minh move",this.moves),this.moves+=t;var e=b[t],a=p(this.position.x+e.x,0,2),s=p(this.position.y+e.y,0,2);a===this.position.x&&s===this.position.y||(this.position.x=a,this.position.y=s,this.cells[this.index]++,this.isLevelPassed()&&this.finishLevel())},isLevelPassed:function(){var t=this.cells[0];return-1===this.cells.findIndex(function(e){return e!==t})},reset:function(){this.cells=this.game.contents.slice(0),this.position=c()({},this.position,this.game.initialSelected)}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"board",style:t.boardStyle,attrs:{tabindex:t.tabIndex}},[1===t.gameLevel?a("div",{staticClass:"demo-arrow-1"}):t._e(),t._v(" "),2===t.gameLevel?a("div",{staticClass:"demo-arrow-2"}):t._e(),t._v(" "),t._l(t.cells,function(e,s){return a("div",{key:s,ref:"cells",refInFor:!0,staticClass:"cell",class:{selected:t.index===s},style:t.cellStyle},[a("Chip",{ref:"chips",refInFor:!0,attrs:{"animation-time-ms":t.animationTimeMs,value:e,"size-px":t.cellSizePx}})],1)})],2)},staticRenderFns:[]};var k=a("VU/8")(x,_,!1,function(t){a("/hH2")},"data-v-36713998",null).exports,y=a("mtWM"),j=a.n(y),C={data:{txs:[],stakeTxId:"",balance:0,email:"",account:"",stake:20},addTx:function(t){this.data.txs.push(t),"Register"===t.action?(this.data.email=t.email,this.data.account=t.account,this.data.balance+=t.tokenChange):"Stake"===t.action?(this.data.stakeTxId=t.txId,this.data.balance+=t.tokenChange):"CompleteLevel"===t.action&&(this.data.balance+=t.tokenChange)},getStakeTxId:function(){return this.data.stakeTxId},getMultiplier:function(){return this.data.stake/20}},w="https://us-central1-harmony-puzzle.cloudfunctions.net";function S(t,e){return e.key=z,j.a.post(w+t,e,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}})}var z="1",P=function(t){return S("/reg",{id:t}).then(function(t){console.log("register",t.data),C.addTx({action:"Register",email:t.data.email,account:t.data.account,timestamp:t.data.timestamp,id:t.data.txid,tokenChange:100})})},E=function(t){return S("/play",{stake:t}).then(function(e){console.log("stakeToken",e.data),C.addTx({action:"Stake",timestamp:e.data.timestamp,value:t,id:e.data.txid,tokenChange:-t})})},T=function(t,e,a){return S("/finish",{level:t,board:e,moves:a,txId:C.getStakeTxId()}).then(function(t){console.log("completeLevel",t.data);var e=5*C.getMultiplier();return C.addTx({action:"CompleteLevel",timestamp:t.data.timestamp,tokenChange:e,id:t.data.txid,level:t.data.level}),e})},L={name:"StakeRow",data:function(){return{globalData:C.data}},methods:{minus:function(){this.globalData.stake<=20||(this.globalData.stake-=20)},plus:function(){this.globalData.stake+20>this.globalData.balance||(this.globalData.stake+=20)},stakeToken:function(){var t=this;E(this.globalData.stake).then(function(){t.$emit("stake",t.globalData.stake)})}}},D={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex-horizontal stake-row"},[a("div",{staticClass:"stake-buttons flex-horizontal"},[a("button",{staticClass:"btn-mini",attrs:{disabled:t.globalData.stake<=20},on:{click:t.minus}},[a("font-awesome-icon",{attrs:{icon:"minus"}})],1),t._v(" "),a("div",{staticClass:"stake-amount flex-hv-center"},[a("div",{staticClass:"icon-dark-token"}),t._v("\n      "+t._s(t.globalData.stake)+"\n    ")]),t._v(" "),a("button",{staticClass:"btn-mini",attrs:{disabled:t.globalData.stake+20>t.globalData.balance},on:{click:t.plus}},[a("font-awesome-icon",{attrs:{icon:"plus"}})],1)]),t._v(" "),a("button",{staticClass:"btn-primary start-btn",attrs:{disabled:t.globalData.balance<20},on:{click:t.stakeToken}},[t._v("Start")])])},staticRenderFns:[]};var I=a("VU/8")(L,D,!1,function(t){a("ICWc")},"data-v-312b694a",null).exports,F={name:"TxHistoryPanel",data:function(){return{globalData:C.data}},methods:{viewDashboard:function(){window.location.href="https://explorer.harmony.one"}}},M={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tx-history-panel"},[a("div",{staticClass:"content flex-vertical"},[a("div",{staticClass:"action-row flex-horizontal"},[a("button",{staticClass:"btn-primary close-btn",on:{click:function(e){return t.$emit("close")}}},[t._v("Close")]),t._v(" "),a("a",{staticClass:"link",on:{click:t.viewDashboard}},[a("font-awesome-icon",{attrs:{icon:"external-link-alt"}}),t._v(" HMY Dashboard\n      ")],1)]),t._v(" "),a("div",{staticClass:"table-wrapper"},[a("table",{staticClass:"tx-history-table"},[t._m(0),t._v(" "),t._l(t.globalData.txs,function(e,s){return a("tr",{key:s,staticClass:"container"},[a("td",[t._v(t._s(t._f("timestamp")(e.timestamp)))]),t._v(" "),a("td",[a("a",{attrs:{href:"https://explorer.harmony.one/#/tx/"+e.id}},[t._v(t._s(t._f("shorten")(e.id)))])])])})],2)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("th",[this._v("Timestamp")]),this._v(" "),e("th",[this._v("Tx")])])}]};var O=a("VU/8")(F,M,!1,function(t){a("vEH0")},"data-v-127d2841",null).exports,R={name:"TutorialPage",data:function(){return{globalData:C.data,isTxPanelOpen:!1}},components:{TxHistoryPanel:O},methods:{viewTxHistory:function(){this.isTxPanelOpen=!0}}},H={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[t.isTxPanelOpen?a("tx-history-panel",{staticClass:"tx-history-panel",on:{close:function(e){t.isTxPanelOpen=!1}}}):t._e(),t._v(" "),a("a",{staticClass:"link",on:{click:t.viewTxHistory}},[t._v("View Transactions")])],1)},staticRenderFns:[]};var U=a("VU/8")(R,H,!1,function(t){a("km6z")},"data-v-e1308de0",null).exports,G=(a("+Uzz"),function(t,e){return Math.floor(Math.random()*(e-t)+t)}),$=function(t){return 1==t?1:t>=2&&t<=4?2:t>=5&&t<=8?3:4},V=function(t,e,a){return-1!=a&&((0!=a||0!=Math.floor(e/3))&&((1!=a||2!=Math.floor(e/3))&&((2!=a||e%3!=0)&&(3!=a||e%3!=2))))};function N(){for(var t,e=new Array(100),a=1;a<101;a++){t=$(a);var s=a+3,n=G(3*t,4*t),i={},o=[];if(1==a)o=[1,0,0,1,1,0,1,1,0],i.contents=o,i.initialSelected={},i.initialSelected.x=0,i.initialSelected.y=0,e[a-1]=i;else if(2==a)o=[2,1,1,1,0,1,2,2,2],i.contents=o,i.initialSelected={},i.initialSelected.x=2,i.initialSelected.y=0,e[a-1]=i;else{for(var l=0;l<9;l++)o.push(s);var r=G(0,9),c=[];o[r]-=1;for(l=0;l<n;l++){var u=-1;do{u=G(0,4)}while(!V(o,r,u));switch(u){case 0:r-=3,c.push('"d"'),l+1!=n&&(o[r]-=1);break;case 1:r+=3,c.push('"u"'),l+1!=n&&(o[r]-=1);break;case 2:r-=1,c.push('"r"'),l+1!=n&&(o[r]-=1);break;case 3:r+=1,c.push('"l"'),l+1!=n&&(o[r]-=1)}}var d=r%3,v=Math.floor(r/3);c=c.reverse(),i.contents=o,i.initialSelected={},i.initialSelected.x=d,i.initialSelected.y=v,e[a-1]=i}}return e}var q=a("162o");var K={name:"PuzzlePage",components:{Game:k,Chip:m,StakeRow:I,TxHistoryLink:U},data:function(){return{globalData:C.data,levelIndex:0,levels:[],boardSizePx:0,size:3,gameStarted:!1,gameEnded:!1,secondsLeft:30,timer:null,timeIncrease:"",balanceIncrease:""}},mounted:function(){var t=function(t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var e=new RegExp("[\\?&]"+t+"=([^&#]*)").exec(location.search);return null===e?"":decodeURIComponent(e[1].replace(/\+/g," "))}("cos");t||(t="hmy-"+"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})),console.log("register as ",t),P(t),this.levels=N(),this.boardSizePx=Math.min(this.$refs.gameContainer.clientWidth,420)},computed:{gameOverStyle:function(){return{fontSize:this.boardSizePx/6+"px"}},boardWrapperStyle:function(){return{width:this.boardSizePx+"px",height:this.boardSizePx+"px"}},level:function(){return this.levels[this.levelIndex]}},methods:{startGame:function(){var t=this;this.gameStarted=!0,this.gameEnded=!1,this.levelIndex=0,this.levels=N(),this.secondsLeft=30,this.timer=Object(q.setInterval)(function(){t.secondsLeft--,t.secondsLeft<=0&&t.endGame()},1e3)},resetLevel:function(){this.$refs["game"+this.levelIndex][0].reset()},onLevelComplete:function(t){var e=this;this.levelIndex!==this.levels.length-1?T(this.levelIndex,this.level,t).then(function(t){e.levelIndex++;e.secondsLeft+=15,e.timeIncrease="+15",e.balanceIncrease="+"+t,s.a.nextTick(function(){e.timeIncrease="",e.balanceIncrease=""})}):this.endGame()},endGame:function(){this.gameEnded=!0,this.gameStarted=!1,C.data.stake=20,Object(q.clearInterval)(this.timer),this.timer=null},restart:function(){this.gameEnded=!1}}},Y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"main-container appearing"},[a("div",{ref:"gameContainer",staticClass:"game-container"},[a("a",{staticClass:"logo",attrs:{href:"https://0.harmony.one/#/address/0x"+t.globalData.account}}),t._v(" "),a("div",{staticClass:"score-container",style:{width:t.boardSizePx+"px"}},[a("div",{staticClass:"balance info-item"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[t._v("\n            "+t._s(t.globalData.balance)+"\n            "),a("transition",[""!=t.balanceIncrease?a("span",{staticClass:"number-increase"},[t._v("\n                "+t._s(t.balanceIncrease)+"\n              ")]):t._e()])],1)]),t._v(" "),a("div",{staticClass:"count-down info-item"},[t._m(1),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"seconds-left",class:{"hurry-up":t.secondsLeft&&t.secondsLeft<=12,"game-over":!t.secondsLeft}},[t._v(t._s(t._f("time")(t.secondsLeft)))]),t._v(" "),a("transition",[""!=t.timeIncrease?a("span",{staticClass:"number-increase"},[t._v("\n                "+t._s(t.timeIncrease)+"\n              ")]):t._e()])],1)])]),t._v(" "),a("div",{staticClass:"board-wrapper",style:t.boardWrapperStyle},[t.gameEnded||!t.gameStarted?a("div",[a("div",{staticClass:"overlay game-over-message appearing"},[a("div",{staticClass:"content"},[t.gameEnded?a("p",{style:t.gameOverStyle},[t._v("Game over!")]):t._e()])])]):t._e(),t._v(" "),t._l(t.levels,function(e,s){return a("transition",{key:s,attrs:{name:"fade"}},[s===t.levelIndex?a("Game",{ref:"game"+s,refInFor:!0,attrs:{"listen-own-key-events-only":!1,"tab-index":1,"board-size-px":t.boardSizePx,game:e,gameLevel:t.levelIndex+1,gameEnded:t.gameEnded},on:{completeLevel:t.onLevelComplete}}):t._e()],1)})],2),t._v(" "),t.gameStarted?t._e():a("stake-row",{style:{width:t.boardSizePx+"px"},on:{stake:t.startGame}}),t._v(" "),t.gameStarted?a("footer",{staticClass:"flex-vertical",style:{width:t.boardSizePx+"px"}},[a("div",{staticClass:"flex-horizontal action-row"},[a("span",{staticClass:"flex-grow level-text"},[t._v("Lv: "+t._s(t.levelIndex+1)+" / "+t._s(t.levels.length))]),t._v(" "),a("button",{staticClass:"btn-primary",style:{visibility:t.gameEnded?"hidden":"visible"},on:{click:t.resetLevel}},[a("font-awesome-icon",{attrs:{icon:"sync"}})],1)])]):t._e(),t._v(" "),t._m(2)],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"label"},[e("div",{staticClass:"icon-token"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"label"},[e("div",{staticClass:"icon-clock"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"link-footer"},[e("a",{staticClass:"link",attrs:{href:"https://0.harmony.one"}},[this._v("View Transactions")])])}]};var B=a("VU/8")(K,Y,!1,function(t){a("esEr")},"data-v-16d8d3b4",null).exports,A={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"email-page"},[a("div",{staticClass:"content"},[a("div",{staticClass:"logo"}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"email-input",attrs:{type:"text",placeholder:"Enter Email Address Here..."},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t._v(" "),a("button",{staticClass:"btn-primary",attrs:{disabled:!t.email.trim()},on:{click:function(e){t.$emit("submit",t.email.trim())}}},[t._v("Submit")])])},staticRenderFns:[]};var W={name:"KeyPage",data:function(){return{globalData:C.data}}},X={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"key-page"},[a("div",{staticClass:"content"},[a("div",{staticClass:"logo"}),t._v(" "),a("div",{staticClass:"msg"},[t._v("Your key has generated")]),t._v(" "),a("div",{staticClass:"key"},[t._v(t._s(t.globalData.account))])]),t._v(" "),a("button",{staticClass:"btn-primary",on:{click:function(e){return t.$emit("start")}}},[t._v("Start Game")])])},staticRenderFns:[]};var J={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tutorial-page"},[t._m(0),t._v(" "),a("button",{staticClass:"btn-primary",on:{click:function(e){return t.$emit("done")}}},[t._v("Got it")])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content"},[e("div",{staticClass:"logo"}),this._v(" "),e("div",{staticClass:"msg"},[e("ul",[e("li",[this._v("Swipe or use arrow keys to move between chips")]),this._v(" "),e("li",[this._v("The number on chip increments by one when you move onto it")]),this._v(" "),e("li",[this._v("You complete the level once all the chips have the same number")])])])])}]};var Q={name:"TutorialPage",data:function(){return{globalData:C.data,stake:20,isTxPanelOpen:!1}},components:{TxHistoryPanel:O},methods:{minus:function(){this.stake<=20||(this.stake-=20)},plus:function(){this.stake+20>this.globalData.balance||(this.stake+=20)},stakeToken:function(){this.$emit("stake",this.stake)},viewTxHistory:function(){this.isTxPanelOpen=!0}}},Z={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tutorial-page"},[t.isTxPanelOpen?a("tx-history-panel",{staticClass:"tx-history-panel",on:{close:function(e){t.isTxPanelOpen=!1}}}):t._e(),t._v(" "),a("div",{staticClass:"page-content"},[t._m(0),t._v(" "),a("div",{staticClass:"stake"},[a("div",{staticClass:"msg"},[t._v("How many tokens to stake?")]),t._v(" "),a("div",{staticClass:"flex-horizontal"},[a("div",{staticClass:"balance info-item flex-grow"},[a("div",{staticClass:"label"},[t._v("Balance")]),t._v(" "),a("div",{staticClass:"content"},[t._v(t._s(t.globalData.balance-t.stake))])]),t._v(" "),a("div",{staticClass:"info-item flex-grow"},[a("div",{staticClass:"label"},[t._v("Stake Amount")]),t._v(" "),a("div",{staticClass:"content"},[t._v(t._s(t.stake))])])]),t._v(" "),a("div",{staticClass:"msg"},[t._v("\n        You'll get\n        "),a("span",{staticClass:"multiplier"},[t._v(t._s(t.stake/20)+"x")]),t._v("\n        rewards.\n      ")]),t._v(" "),a("div",{staticClass:"action-buttons flex-horizontal"},[a("button",{staticClass:"btn-mini",attrs:{disabled:t.stake<=20},on:{click:t.minus}},[a("font-awesome-icon",{attrs:{icon:"minus"}})],1),t._v(" "),a("button",{staticClass:"btn-mini",attrs:{disabled:t.stake+20>t.globalData.balance},on:{click:t.plus}},[a("font-awesome-icon",{attrs:{icon:"plus"}})],1)])])]),t._v(" "),a("button",{staticClass:"btn-primary",attrs:{disabled:t.globalData.balance<20},on:{click:t.stakeToken}},[t._v("Start Game")]),t._v(" "),a("footer",[a("div",{staticClass:"host flex-horizontal"},[a("a",{staticClass:"link flex-grow",on:{click:function(e){return t.$emit("seeTutorial")}}},[t._v("Tutorial")]),t._v(" "),a("a",{staticClass:"link flex-grow",on:{click:t.viewTxHistory}},[t._v("View Transactions")])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("header",[e("div",{staticClass:"logo tada"})])}]};var tt={name:"HostingPage",components:{WelcomePage:l,EmailPage:a("VU/8")({name:"Submit",data:function(){return{email:""}}},A,!1,function(t){a("NYrh")},"data-v-776e6b07",null).exports,KeyPage:a("VU/8")(W,X,!1,function(t){a("DUGH")},"data-v-7c82d3ae",null).exports,TutorialPage:a("VU/8")({name:"TutorialPage"},J,!1,function(t){a("TK9d")},"data-v-e457061a",null).exports,StakePage:a("VU/8")(Q,Z,!1,function(t){a("DGst")},"data-v-4a52b548",null).exports,PuzzlePage:B},data:function(){return{step:5,userKey:"Oxhsa89sd23jkl3450stypose00"}},mounted:function(){},methods:{join:function(){this.step++},submitEmail:function(t){var e=this;P(t).then(function(){e.step++})},stake:function(t){var e=this;E(t).then(function(){e.step=5})},startGame:function(){this.step++},seeTutorial:function(){this.step=4},doneTutorial:function(){this.step=3},restartGame:function(){this.step=5}}},et={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"host"},[0===t.step?a("welcome-page",{on:{join:t.join}}):t._e(),t._v(" "),1===t.step?a("email-page",{on:{submit:t.submitEmail}}):t._e(),t._v(" "),2===t.step?a("key-page",{attrs:{userKey:t.userKey},on:{start:t.startGame}}):t._e(),t._v(" "),3===t.step?a("stake-page",{on:{stake:t.stake,seeTutorial:t.seeTutorial}}):t._e(),t._v(" "),4===t.step?a("tutorial-page",{on:{done:t.doneTutorial}}):t._e(),t._v(" "),5===t.step?a("puzzle-page",{on:{restart:t.restartGame}}):t._e()],1)},staticRenderFns:[]};var at=a("VU/8")(tt,et,!1,function(t){a("DwsL")},"data-v-09062bca",null).exports,st=a("/ocq");s.a.use(st.a);var nt=new st.a({routes:[{path:"/",name:"HostingPage",component:at}]}),it=a("PJh5"),ot=a.n(it);function lt(t){var e=t+"";return 1===e.length&&(e="0"+e),e}s.a.filter("timestamp",function(t){return ot()(t).format("MM/DD/YYYY hh:mm:ss")}),s.a.filter("shorten",function(t){return!t||t.length<=10?t:t.substr(0,5)+"..."+t.substr(t.length-5)}),s.a.filter("time",function(t){var e=t%60;return lt(Math.floor(t/60))+":"+lt(e)});var rt=a("C/JF"),ct=a("fhbW"),ut=a("1e6/");rt.c.add(ct.d,ct.c,ct.b,ct.a),s.a.component("font-awesome-icon",ut.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:nt,components:{App:i},template:"<App/>"})},NYrh:function(t,e){},TK9d:function(t,e){},esEr:function(t,e){},"frv/":function(t,e){},hYqd:function(t,e,a){t.exports=a.p+"static/media/begin.cb0209d.wav"},j5xL:function(t,e,a){t.exports=a.p+"static/media/move.ee58807.wav"},km6z:function(t,e){},oYgK:function(t,e,a){var s=a("j5xL"),n=a("hYqd"),i=a("rteI");playSound=function(t){new Audio(t).play()},playMoveSound=function(){playSound(s)},playBeginSound=function(){playSound(n)},playEndSound=function(){playSound(i)},t.exports={playMoveSound:playMoveSound,playBeginSound:playBeginSound,playEndSound:playEndSound}},rteI:function(t,e,a){t.exports=a.p+"static/media/end.594bb95.wav"},tMKh:function(t,e){},uslO:function(t,e,a){var s={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-SG":"oYA3","./en-SG.js":"oYA3","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./ga":"U5Iz","./ga.js":"U5Iz","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it-ch":"/E8D","./it-ch.js":"/E8D","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ku":"kI9l","./ku.js":"kI9l","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function n(t){return a(i(t))}function i(t){var e=s[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}n.keys=function(){return Object.keys(s)},n.resolve=i,t.exports=n,n.id="uslO"},vEH0:function(t,e){},"wb+E":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.b2a75a647f0a50b08ecb.js.map