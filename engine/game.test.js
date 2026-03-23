const test = require("node:test");
const assert = require("node:assert/strict");

const { CommandParser, ParseError } = require("./parser");
const CommandHandler = require("./command");
const Game = require("./game");

test("CommandParser: parse look", () => {
  const parser = new CommandParser();
  const result = parser.parse("look");

  assert.deepEqual(result, { type: "look" });
});

test("CommandParser: parse go with direction", () => {
  const parser = new CommandParser();
  const result = parser.parse("go north");

  assert.deepEqual(result, { type: "go", direction: "north" });
});

test("CommandParser: parse quit", () => {
  const parser = new CommandParser();
  const result = parser.parse("quit");

  assert.deepEqual(result, { type: "quit" });
});

test("CommandParser: empty input throws ParseError", () => {
  const parser = new CommandParser();

  assert.throws(() => parser.parse("   "), ParseError);
});

test("CommandParser: invalid command throws ParseError", () => {
  const parser = new CommandParser();

  assert.throws(() => parser.parse("foobar"), ParseError);
});

test("CommandHandler: quit returns shouldExit true", () => {
  const fakeGame = {
    describeCalled: 0,
    moveCalledWith: null,
    describe() {
      this.describeCalled += 1;
    },
    move(direction) {
      this.moveCalledWith = direction;
    },
  };

  const handler = new CommandHandler(fakeGame);
  const result = handler.execute("quit");

  assert.equal(result.shouldExit, true);
  assert.equal(fakeGame.describeCalled, 0);
  assert.equal(fakeGame.moveCalledWith, null);
});

test("Game: handleInput quit returns shouldExit true", () => {
  const game = new Game();
  const result = game.handleInput("quit");

  assert.equal(result.shouldExit, true);
});

test("Game: go north changes room", () => {
  const game = new Game();
  const initialRoom = game.player.currentRoom;

  game.handleInput("go north");

  assert.notEqual(game.player.currentRoom, initialRoom);
  assert.equal(game.player.currentRoom.description, "你在北边森林");
});

test("Game: player starts at spawn with base attributes", () => {
  const game = new Game();

  assert.equal(game.player.CurrentRoom, game.world.startRoom);
  assert.equal(game.player.Name, "冒险者");
  assert.equal(game.player.HP, 100);
  assert.equal(game.player.Level, 1);
});

test("Player: setCurrentRoom updates CurrentRoom", () => {
  const game = new Game();
  const targetRoom = game.world.startRoom.getExit("east");

  game.player.setCurrentRoom(targetRoom);

  assert.equal(game.player.CurrentRoom, targetRoom);
  assert.equal(game.player.currentRoom.description, "你在东边湖泊");
});
