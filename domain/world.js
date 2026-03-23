const Room = require("./room");

class World {
  constructor() {
    const start = new Room("你在起点");
    const north = new Room("你在北边森林");
    const east = new Room("你在东边湖泊");
    const west = new Room("你在西边山洞");
    const south = new Room("你在南边村庄");

    // 建立连接
    start.setExit("north", north);
    start.setExit("east", east);
    start.setExit("west", west);
    start.setExit("south", south);

    north.setExit("south", start);
    east.setExit("west", start);
    west.setExit("east", start);
    south.setExit("north", start);

    this.startRoom = start;
  }
}

module.exports = World;