class Room {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
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

export default Room;
