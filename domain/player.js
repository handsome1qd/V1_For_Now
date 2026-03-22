class Player {
    constructor(startRoom) {
      this.currentRoom = startRoom;
    }
  
    moveTo(room) {
      this.currentRoom = room;
    }
  }
  
  module.exports = Player;