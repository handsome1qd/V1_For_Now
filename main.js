const readline = require("readline");
const Game = require("./engine/game");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const game = new Game();
let isRunning = true;

console.log("欢迎来到 MUD 游戏！");
game.describe();

function prompt() {
  if (!isRunning) {
    rl.close();
    return;
  }

  rl.question("> ", (input) => {
    try {
      const result = game.handleInput(input);
      if (result && result.shouldExit) {
        console.log("游戏结束，欢迎下次再来！");
        isRunning = false;
        rl.close();
        return;
      }
    } catch (e) {
      if (e && e.isUserInputError) {
        console.log("我听不懂你在说什么");
      } else {
        console.log("系统忙线，请稍后再试。");
      }
    }
    prompt();
  });
}

rl.on("close", () => {
  process.exit(0);
});

prompt();