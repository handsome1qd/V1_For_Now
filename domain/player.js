class Player {
  constructor(name, startRoom) {
    // Backward compatible: allow constructor(startRoom)
    if (startRoom === undefined) {
      startRoom = name;
      name = "冒险者";
    }

    this.Name = name;
    this.CurrentRoom = startRoom;

    // Reserved basic attributes for later sprints.
    this.HP = 100;
    this.Level = 1;
  }

  get name() {
    return this.Name;
  }

  set name(value) {
    this.Name = value;
  }

  get currentRoom() {
    return this.CurrentRoom;
  }

  set currentRoom(room) {
    this.CurrentRoom = room;
  }

  moveTo(room) {
    this.CurrentRoom = room;
  }

  setCurrentRoom(room) {
    this.CurrentRoom = room;
  }
}

module.exports = Player;