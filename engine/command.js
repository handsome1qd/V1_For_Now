const { CommandParser } = require("./parser");

class CommandHandler {
  constructor(game) {
    this.game = game;
    this.parser = new CommandParser();
  }

  execute(input) {
    const command = this.parser.parse(input);

    switch (command.type) {
      case "look":
        this.game.describe();
        return { shouldExit: false };
      case "go":
        this.game.move(command.direction);
        return { shouldExit: false };
      case "quit":
        return { shouldExit: true };
      default:
        return { shouldExit: false };
    }
  }
}

module.exports = CommandHandler;