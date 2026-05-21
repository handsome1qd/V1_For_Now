class CommandHandler {
  constructor(gameEngine) {
    this.game = gameEngine;
  }

  execute(input) {
    const args = input.trim().split(/\s+/);
    const command = args[0].toLowerCase();

    switch (command) {
      case 'look':
        return this.game.describe();
      case 'go':
        return this.game.move(args[1]);
      case 'north':
      case 'n':
        return this.game.move('north');
      case 'south':
      case 's':
        return this.game.move('south');
      case 'east':
      case 'e':
        return this.game.move('east');
      case 'west':
      case 'w':
        return this.game.move('west');
      case 'help':
        return this.game.showHelp();
      default:
        return { type: 'error', message: '未知指令！输入 help 查看可用命令。' };
    }
  }
}

export default CommandHandler;
