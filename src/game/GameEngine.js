import Player from './Player.js';
import World from './World.js';
import CommandHandler from './CommandHandler.js';

class GameEngine {
  constructor() {
    this.world = new World();
    this.player = new Player(this.world.startRoom);
    this.commandHandler = new CommandHandler(this);
    this.logs = [];
    this.listeners = [];
  }

  /**
   * 订阅状态变化
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * 通知所有订阅者
   */
  notify() {
    this.listeners.forEach(listener => listener());
  }

  /**
   * 添加日志
   */
  addLog(message, type = 'info') {
    this.logs.push({ message, type, timestamp: Date.now() });
    this.notify();
  }

  /**
   * 处理用户输入
   */
  handleInput(input) {
    if (!input || input.trim() === '') return;
    this.addLog(`> ${input}`, 'command');
    const result = this.commandHandler.execute(input);
    if (result) {
      if (result.type === 'error') {
        this.addLog(result.message, 'error');
      } else if (result.type === 'describe') {
        this.addLog(result.message, 'info');
        if (result.exits && result.exits.length > 0) {
          this.addLog(`出口: ${result.exits.join(', ')}`, 'info');
        }
      } else if (result.type === 'move') {
        this.addLog(result.message, 'success');
        if (result.exits && result.exits.length > 0) {
          this.addLog(`出口: ${result.exits.join(', ')}`, 'info');
        }
      } else if (result.type === 'help') {
        result.messages.forEach(msg => this.addLog(msg, 'info'));
      }
    }
    this.notify();
  }

  /**
   * 移动玩家
   */
  move(direction) {
    const nextRoom = this.player.currentRoom.getExit(direction);
    if (!nextRoom) {
      return { type: 'error', message: '不能往这个方向走！' };
    }
    this.player.moveTo(nextRoom);
    const exits = Object.keys(this.player.currentRoom.exits);
    return {
      type: 'move',
      message: `你向${this.getDirectionName(direction)}移动...\n${this.player.currentRoom.description}`,
      exits
    };
  }

  /**
   * 描述当前房间
   */
  describe() {
    const exits = Object.keys(this.player.currentRoom.exits);
    return {
      type: 'describe',
      message: this.player.currentRoom.description,
      exits
    };
  }

  /**
   * 显示帮助
   */
  showHelp() {
    return {
      type: 'help',
      messages: [
        '=== 帮助 ===',
        'look          - 查看当前房间',
        'go [方向]     - 向指定方向移动',
        'north / n     - 向北移动',
        'south / s     - 向南移动',
        'east / e      - 向东移动',
        'west / w      - 向西移动',
        'help          - 显示帮助',
        '============='
      ]
    };
  }

  /**
   * 获取方向中文名
   */
  getDirectionName(direction) {
    const map = {
      north: '北',
      south: '南',
      east: '东',
      west: '西'
    };
    return map[direction] || direction;
  }

  /**
   * 获取当前状态（用于 UI 渲染）
   */
  getState() {
    return {
      currentRoom: this.player.currentRoom,
      logs: this.logs
    };
  }
}

export default GameEngine;
