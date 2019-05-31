<style scoped lang="less">
.score-container {
  margin-right: auto;
  margin-left: auto;
  justify-content: space-between;
  display: flex;
  flex: 1;
  flex-direction: row;
}

footer {
  margin: 1em auto 0;
  .btn-primary {
    font-size: 1em;
    background-color: #482bff;
  }
}

.board-wrapper {
  position: relative;
  margin: 0 auto;
  flex-grow: 0;
  flex-shrink: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.game-over-message {
  font-weight: bold;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0.3em;
}

.content-tutorial {
  height: 100%;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-level10 {
  background: rgba(255, 255, 255, 0.2);
  .buttons {
    margin: 20px 0;
    width: 150px;
    margin: 0 auto;
    .btn-primary {
      width: 100%;
    }
  }
}

.main-container {
  height: 100%;
  .game-container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    .overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.blur-text {
  opacity: 0.8;
}

.appearing {
  animation: appearing 1s;
  -webkit-animation: appearing 1s;
}

@keyframes appearing {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.action-row + .action-row {
  margin-top: 1em;
}
.info-item {
  align-self: flex-end;
  .content {
    position: relative;
  }
}
.count-down {
  .seconds-left {
    &.hurry-up {
      color: #f6371d;
    }
    &.hurry-up {
      animation-name: headShake;
      animation-duration: 1s;
      animation-timing-function: ease-int-out;
      animation-iteration-count: infinite;
    }
  }
}

@keyframes headShake {
  0% {
    transform: translateX(0);
  }

  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    transform: translateX(0);
  }
}

.number-increase {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  color: #2c3e50;
  width: 100%;
  animation: up-disappear 1.5s;
}
@keyframes up-disappear {
  0% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
    transform: translateY(-40px);
  }
}
.link-footer {
  left: 0;
  width: 100%;
  padding: 1em;
  text-align: center;
  z-index: 1000;
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 40px;
}
.fake-footer {
  flex: 1;
}
.icon-clock,
.icon-token {
  background-size: contain;
}

.icon-clock {
  background-image: url(../assets/clock.svg);
}
.icon-token {
  background-image: url(../assets/token.svg);
}
.level-text {
  font-weight: bold;
}
.logo {
  align-self: flex-start;
}
.link {
  font-size: 0.8em;
  text-align: center;
  text-decoration: none;
}
</style>

<template>
  <div id="app">
<!--    <redeem-panel-->
<!--      v-if="gameEnded && !globalData.email && !cancelEmail"-->
<!--      :reward="reward"-->
<!--      :boardSizePx="boardSizePx"-->
<!--      @cancelEmail="closeEmailPopup"-->
<!--    ></redeem-panel>-->
    <div class="main-container appearing">
      <div class="game-container" ref="gameContainer">
        <a
          :href="'https://explorer2.harmony.one/#/address/' + globalData.address"
          class="logo"
          target="_blank"
        ></a>
        <div class="score-container" :style="{ width: boardSizePx + 'px' }">
          <div class="balance info-item" :style="infoItemStyle">
            <div class="label">
              <div class="icon-token" :style="iconTokenStyle"></div>
            </div>
            <div class="content">
              {{ globalData.balance }}
              <transition>
                <span v-if="balanceIncrease!=''" class="number-increase">{{ balanceIncrease }}</span>
              </transition>
            </div>
          </div>
          <div class="count-down info-item" :style="infoItemStyle">
            <div class="label">
              <div class="icon-clock" :style="iconClockStyle"></div>
            </div>
            <div class="content">
              <div
                class="seconds-left"
                :class="{ 'hurry-up': secondsLeft && secondsLeft <= 12, 'game-over': !secondsLeft }"
              >{{ secondsLeft | time }}</div>
              <transition>
                <span v-if="timeIncrease!=''" class="number-increase">
                  {{
                  timeIncrease
                  }}
                </span>
              </transition>
            </div>
          </div>
        </div>

        <div class="board-wrapper" :style="boardWrapperStyle">
<!--          <div v-if="gameEnded || !gameStarted">-->
<!--            <div class="overlay game-over-message appearing">-->
<!--              <div class="content content-tutorial">-->
<!--                <p :style="gameOverStyle" v-if="!globalData.privkey">Logging in...</p>-->
<!--                <p :style="gameOverStyle" v-else-if="gameEnded">Game over!</p>-->
<!--                <p class="blur-text" :style="gameTutorialStyle" v-else-if="!gameStarted">-->
<!--                  <span-->
<!--                    :style="gameTutorialSmallStyle"-->
<!--                  >Place bet (bottom left) and click “Start"</span>-->
<!--                  <br>-->
<!--                </p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

          <div v-if="isLevel10">
            <div class="overlay game-over-message appearing">
              <div class="content content-level10">
                <div>
                  <p class="blur-text" :style="gameTutorialStyle">
                    <span :style="gameTutorialSmallStyle">Congrats!</span>
                    <br>
                    <span :style="gameTutorialSmallStyle">You finished level {{ this.levelIndex+1 }}</span>
                    <br>
                    <span v-if="gameEnded" :style="gameTutorialSmallStyle">You just won {{ reward }} Harmony Tokens!</span>
                    <br>
                    <span :style="gameTutorialSmallStyle">Tweet your success!</span>
                    <br>
                    <br>
                  </p>
                </div>
                <div class="buttons">
                  <div>
                    <social-sharing :title="twitterTitle"
                                    url=""
                                    twitter-user="harmonyprotocol"
                                    inline-template>
                      <network network="twitter">
                        <a class="btn-primary">
                          <i class="fab fa-twitter"></i> Tweet
                        </a>
                      </network>
                    </social-sharing>
                  </div>

                  <div>
                    <button v-if="!gameEnded" class="btn-primary" @click="keepPlaying">
                      Keep Playing!
                    </button>

                    <button v-if="gameEnded" class="btn-primary" @click="restartGame">
                      Play again!
                    </button>
                  </div>
                </div>
                <div>

                </div>
              </div>
            </div>
          </div>

          <transition name="fade" v-for="(level, i) in levels" :key="i">
            <Game
              :ref="'game' + i"
              :listen-own-key-events-only="false"
              :tab-index="1"
              :board-size-px="boardSizePx"
              :game="level"
              :gameLevel="levelIndex+1"
              :isLevel10="isLevel10"
              :gameStarted="gameStarted"
              :gameEnded="gameEnded"
              @completeLevel="onLevelComplete"
              v-if="i === levelIndex"
            ></Game>
          </transition>
        </div>

        <stake-row
          v-if="!gameStarted"
          @stake="startGame"
          :style="stakeRowStyle"
          @stakeToken="resetLevel"
        ></stake-row>
        <footer class="flex-vertical" :style="{ width: boardSizePx + 'px' }" v-if="gameStarted">
          <div class="flex-horizontal action-row">
            <span
              class="flex-grow level-text"
              :style="levelTextStyle"
            >Level: {{ levelIndex + 1 }} / {{ levels.length }}</span>
            <button
              class="btn-primary"
              @click="resetLevel"
              :style="{
                visibility: gameEnded ? 'hidden':'visible',
                fontSize: boardSizePx / 20 + 'px'
                }"
            >
              <font-awesome-icon icon="sync"></font-awesome-icon>
            </button>
          </div>
        </footer>
        <div class="link-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from "./Game";
import Chip from "./Chip";
import StakeRow from "./StakeRow";
import TxHistoryLink from "./TxHistoryLink";
import RedeemPanel from "./RedeemPanel";
import { TweenLite } from "gsap/TweenMax";
import Vue from "vue";
import service from "../service";
import store from "../store";
import { levels } from "../level-generator";
import { setInterval, clearInterval } from "timers";

const InitialSeconds = 30;
function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getParameterByName(name) {
  var undefined;
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? undefined
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.mobilecheck = function() {
  var check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

export default {
  name: "PuzzlePage",
  components: {
    Game,
    Chip,
    StakeRow,
    TxHistoryLink,
    RedeemPanel
  },
  data() {
    return {
      globalData: store.data,
      levelIndex: 0,
      // levels: [],
      levels: levels(), // start with level 0 instead of demo
      boardSizePx: 0,
      size: 3,
      gameStarted: false,
      gameEnded: false,
      isLevel10: false,
      secondsLeft: InitialSeconds,
      timer: null,
      timeIncrease: "",
      balanceIncrease: "",
      isMobile: mobilecheck(),
      reward: 0,
      cancelEmail: false
    };
  },
  mounted() {
    let id = getParameterByName("cos");
    this.levels = levels();
    //Set board size follow height of screen when change screen size
    window.addEventListener(
      "resize",
      () => {
        this.boardSizePx = Math.min(
          this.$refs.gameContainer.clientWidth,
          window.innerHeight / 1.7
        );
        this.$forceUpdate;
      },
      false
    );
    // Set board size follow height of screen
    this.boardSizePx = Math.min(
      this.$refs.gameContainer.clientWidth,
      window.innerHeight / 1.7
    );
    service.register(id);
  },
  computed: {
    gameOverStyle() {
      return { fontSize: this.boardSizePx / 6 + "px" };
    },
    //TODO
    //can we find a better way to update the styles?
    //I don't want to have so many style related code in the view model.
    // Ideally it should only contain work-flow related logic.
    // Possible solution: setting the font-size of container and use em to control those sizes using css?
    ///Then we only need to use JS to change one thing -- font-size of container.
    gameTutorialStyle() {
      return { fontSize: this.boardSizePx / 14 + "px" };
    },
    /*MOVE CURSOR TO ADJACENT CELLS...*/
    gameTutorialSmallStyle() {
      return { fontSize: this.boardSizePx / 16 + "px" };
    },
    infoItemStyle() {
      return { fontSize: this.boardSizePx / 18 + "px" };
    },
    levelTextStyle() {
      return { fontSize: this.boardSizePx / 18 + "px" };
    },
    /*tokens and start button on bottom*/
    stakeRowStyle() {
      return {
        width: this.boardSizePx + "px",
        fontSize: this.boardSizePx / 20 + "px"
      };
    },
    titleStyle() {
      return {
        fontSize: this.boardSizePx / 20 + "px"
      };
    },
    iconTokenStyle() {
      return {
        width: this.boardSizePx / 7.6 + "px",
        height: this.boardSizePx / 12 + "px"
      };
    },
    iconClockStyle() {
      return {
        width: this.boardSizePx / 12 + "px",
        height: this.boardSizePx / 12 + "px"
      };
    },
    boardWrapperStyle() {
      return {
        width: this.boardSizePx + "px",
        height: this.boardSizePx + "px"
      };
    },
    level() {
      return this.levels[this.levelIndex];
    },
    /**
     * Twitter title
     * @return {string}
     */
    twitterTitle() {
      return `I won level 10 of #harmonypuzzle my coupon code is 12345678  #harmonyprotocol play it here https://puzzle.harmony.one https://explorer2.harmony.one/#/address/${this.globalData.address}`
    }
  },
  destroyed() {
    // Remove event change screen
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.gameEnded = false;
      this.cancelEmail = false;
      this.levelIndex = 0;
      this.reward = 0;
      this.levels = levels();
      this.secondsLeft = InitialSeconds;
      this.timer = setInterval(() => {
        this.secondsLeft--;
        if (this.secondsLeft <= 0) {
          this.endGame();
        }
      }, 1000);
    },
    resetLevel() {
      this.$refs[`game${this.levelIndex}`][0].reset();
    },
    /***
     * Track analytics current level
     * @param level
     */
    gaTrack(level) {
      this.$ga.event('puzzle-game', 'game-level', 'current-level', level)
    },
    onLevelComplete(moves) {
      this.gaTrack(this.levelIndex);
      if (this.levelIndex === 9) {
        this.endLevel10()
        return;
      }

      // TODO: nxqd We will improve this logic when we have the coupon implemented.
      if (this.levelIndex === this.levels.length - 1) {
        this.endGame();
        return;
      }
      service
        .completeLevel(this.globalData.privkey, this.levelIndex + 1, moves)
        .then(rewards => {
          this.levelIndex++;
          let timeChange = 15;
          this.secondsLeft += timeChange;
          this.timeIncrease = `+${timeChange}`;
          this.balanceIncrease = `+${rewards}`;
          this.reward += rewards;
          Vue.nextTick(() => {
            this.timeIncrease = "";
            this.balanceIncrease = "";
          });
        });
    },
    endLevel10() {
      stopBackgroundMusic()
      this.isLevel10 = true;
      clearInterval(this.timer);
    },
    endGame() {
      stopBackgroundMusic();
      this.isLevel10 = true;
      this.gameEnded = true;
      this.gameStarted = false;
      store.data.stake = 20;
      clearInterval(this.timer);
      this.timer = null;
    },
    restart() {
      this.gameEnded = false;
    },
    closeEmailPopup() {
      this.cancelEmail = true;
    },
    keepPlaying() {
      playBackgroundMusic();
      this.isLevel10 = false;
      this.levelIndex++;
      this.startTimer();
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.secondsLeft--;
        if (this.secondsLeft <= 0) {
          this.endGame();
        }
      }, 1000);
    },

    /**
     * Reload game by refresh the page.
     */
    restartGame() {
      window.location.reload();
    }
  }
};
</script>
