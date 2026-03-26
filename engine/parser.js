class ParseError extends Error {
  constructor(message) {
    super(message);
    this.name = "ParseError";
    this.isUserInputError = true;
  }
}

class CommandParser {
  parse(input) {
    if (typeof input !== "string") {
      throw new ParseError("我听不懂你在说什么");
    }

    const normalized = input.trim();
    if (!normalized) {
      throw new ParseError("我听不懂你在说什么");
    }

    const tokens = normalized.split(/\s+/);
    const command = tokens[0].toLowerCase();

    switch (command) {
      case "look":
        return { type: "look" };
      case "go": {
        const direction = tokens[1] && tokens[1].toLowerCase();
        if (!direction) {
          throw new ParseError("我听不懂你在说什么");
        }
        return { type: "go", direction };
      }
      case "quit":
        return { type: "quit" };
      default:
        throw new ParseError("我听不懂你在说什么");
    }
  }
}

module.exports = {
  CommandParser,
  ParseError,
};