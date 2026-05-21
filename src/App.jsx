import React, { useState, useEffect, useRef } from 'react'
import GameEngine from './game/GameEngine.js'
import GameMap from './components/GameMap.jsx'
import RoomPanel from './components/RoomPanel.jsx'
import CommandBar from './components/CommandBar.jsx'
import GameLog from './components/GameLog.jsx'
import MiniMap from './components/MiniMap.jsx'

function App() {
  const [gameEngine] = useState(() => new GameEngine())
  const [currentRoom, setCurrentRoom] = useState(gameEngine.player.currentRoom)
  const [logs, setLogs] = useState([])
  const [showHelp, setShowHelp] = useState(false)
  const logEndRef = useRef(null)

  useEffect(() => {
    // 初始欢迎信息
    gameEngine.addLog('欢迎来到 MUD 游戏！输入 help 查看帮助。', 'system')
    gameEngine.addLog(gameEngine.player.currentRoom.description, 'info')
    const exits = Object.keys(gameEngine.player.currentRoom.exits)
    gameEngine.addLog(`出口: ${exits.join(', ')}`, 'info')

    // 订阅状态变化
    const unsubscribe = gameEngine.subscribe(() => {
      setCurrentRoom({ ...gameEngine.player.currentRoom })
      setLogs([...gameEngine.logs])
    })

    return unsubscribe
  }, [gameEngine])

  // 自动滚动到底部
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  const handleCommand = (input) => {
    gameEngine.handleInput(input)
  }

  const handleDirection = (direction) => {
    gameEngine.handleInput(`go ${direction}`)
  }

  const handleRoomClick = (roomId) => {
    // 检查点击的房间是否与当前房间相邻
    const exits = gameEngine.player.currentRoom.exits
    for (const [dir, room] of Object.entries(exits)) {
      if (room.id === roomId) {
        handleDirection(dir)
        return
      }
    }
    gameEngine.addLog('那个房间太远了，无法直接到达。', 'error')
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>MUD 游戏</h1>
        <span className="game-subtitle">Web 版</span>
      </header>

      <div className="game-layout">
        <div className="game-main">
          <GameMap
            world={gameEngine.world}
            currentRoom={currentRoom}
            onRoomClick={handleRoomClick}
          />
          <RoomPanel
            room={currentRoom}
            onDirection={handleDirection}
          />
        </div>

        <div className="game-sidebar">
          <MiniMap
            world={gameEngine.world}
            currentRoom={currentRoom}
            onRoomClick={handleRoomClick}
          />
          <GameLog logs={logs} logEndRef={logEndRef} />
          <CommandBar
            onCommand={handleCommand}
            onDirection={handleDirection}
            currentRoom={currentRoom}
          />
        </div>
      </div>
    </div>
  )
}

export default App
