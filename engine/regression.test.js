const test = require("node:test");
const assert = require("node:assert/strict");

const { CommandParser, ParseError } = require("./parser");
const Game = require("./game");

test("CommandParser: parse command with extra spaces and mixed case", () => {
  const parser = new CommandParser();

  const result = parser.parse("  Go   North  ");

  assert.deepEqual(result, { type: "go", direction: "north" });
});

test("CommandParser: missing go direction throws ParseError", () => {
  const parser = new CommandParser();

  assert.throws(() => parser.parse("go"), ParseError);
});

test("Game: invalid direction keeps player in current room", () => {
  const game = new Game();
  const initialRoom = game.player.currentRoom;
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(" "));
  };

  try {
    game.move("up");
  } finally {
    console.log = originalLog;
  }

  assert.equal(game.player.currentRoom, initialRoom);
  assert.ok(logs.includes("不能往这个方向走！"));
});
