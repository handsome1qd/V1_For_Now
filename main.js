const readline = require("readline");
const Game = require("./engine/game");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const game = new Game();

console.log("欢迎来到 MUD 游戏！");
game.describe();

function prompt() {
  rl.question("> ", (input) => {
    try {
      game.handleInput(input);
    } catch (e) {
      console.log("输入错误，请重试！");
    }
    prompt();
  });
}

prompt();