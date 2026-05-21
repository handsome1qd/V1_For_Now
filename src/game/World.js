import Room from './Room.js';

class World {
  constructor() {
    const start = new Room('start', '起点', '你在起点，四周是开阔的平原。');
    const north = new Room('north', '北边森林', '你在北边森林，树木高耸入云，阳光透过树叶洒下斑驳的光影。');
    const east = new Room('east', '东边湖泊', '你在东边湖泊，湖水清澈见底，微风吹过泛起阵阵涟漪。');
    const west = new Room('west', '西边山洞', '你在西边山洞，洞内阴暗潮湿，隐约能听到水滴的声音。');
    const south = new Room('south', '南边村庄', '你在南边村庄，炊烟袅袅，村民们正在忙碌地劳作。');

    // 建立连接
    start.setExit('north', north);
    start.setExit('east', east);
    start.setExit('west', west);
    start.setExit('south', south);

    north.setExit('south', start);
    east.setExit('west', start);
    west.setExit('east', start);
    south.setExit('north', start);

    this.rooms = { start, north, east, west, south };
    this.startRoom = start;
  }
}

export default World;
