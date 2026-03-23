class Room {
    constructor(description) {
      this.description = description;
      this.exits = {};
    }
  
    setExit(direction, room) {
      this.exits[direction] = room;
    }
  
    getExit(direction) {
      return this.exits[direction];
    }
  }
  
  module.exports = Room;