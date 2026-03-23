const Player = require("../domain/player");
const World = require("../domain/world");
const CommandHandler = require("./command");

class Game {
  constructor() {
    this.world = new World();
    this.player = new Player(this.world.startRoom);
    this.commandHandler = new CommandHandler(this);
  }

  handleInput(input) {
    this.commandHandler.execute(input);
  }

  move(direction) {
    const nextRoom = this.player.currentRoom.getExit(direction);
    if (!nextRoom) {
      console.log("不能往这个方向走！");
      return;
    }
    this.player.moveTo(nextRoom);
    this.describe();
  }

  describe() {
    console.log(this.player.currentRoom.description);
    console.log("出口:", Object.keys(this.player.currentRoom.exits).join(" "));
  }
}

module.exports = Game;