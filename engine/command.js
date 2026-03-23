class CommandHandler {
    constructor(game) {
      this.game = game;
    }
  
    execute(input) {
      const args = input.trim().split(" ");
      const command = args[0];
  
      switch (command) {
        case "look":
          this.game.describe();
          break;
        case "go":
          this.game.move(args[1]);
          break;
        default:
          console.log("未知指令！");
      }
    }
  }
  
  module.exports = CommandHandler;