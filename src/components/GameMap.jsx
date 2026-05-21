import React, { useRef, useEffect } from 'react'

// 房间在 Canvas 上的布局坐标
const ROOM_POSITIONS = {
  start: { x: 300, y: 300 },
  north: { x: 300, y: 100 },
  south: { x: 300, y: 500 },
  east: { x: 500, y: 300 },
  west: { x: 100, y: 300 }
}

const ROOM_SIZE = 120
const ARROW_LENGTH = 40

function GameMap({ world, currentRoom, onRoomClick }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    // 设置高 DPI 画布
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    drawMap(ctx, rect.width, rect.height, world, currentRoom)
  }, [world, currentRoom])

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 检查是否点击了某个房间
    for (const [id, pos] of Object.entries(ROOM_POSITIONS)) {
      if (
        x >= pos.x - ROOM_SIZE / 2 &&
        x <= pos.x + ROOM_SIZE / 2 &&
        y >= pos.y - ROOM_SIZE / 2 &&
        y <= pos.y + ROOM_SIZE / 2
      ) {
        onRoomClick(id)
        return
      }
    }
  }

  return (
    <div className="game-map-container">
      <h3 className="section-title">世界地图</h3>
      <canvas
        ref={canvasRef}
        className="game-map-canvas"
        onClick={handleCanvasClick}
        style={{ width: '100%', height: '400px' }}
      />
      <p className="map-hint">点击房间可移动过去</p>
    </div>
  )
}

function drawMap(ctx, width, height, world, currentRoom) {
  // 清空画布
  ctx.clearRect(0, 0, width, height)

  // 绘制背景
  const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2)
  gradient.addColorStop(0, '#1a1a2e')
  gradient.addColorStop(1, '#0f0f1a')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // 绘制连接线（出口）
  for (const [roomId, pos] of Object.entries(ROOM_POSITIONS)) {
    const room = world.rooms[roomId]
    if (!room) continue

    for (const [direction, connectedRoom] of Object.entries(room.exits)) {
      const connectedPos = ROOM_POSITIONS[connectedRoom.id]
      if (!connectedPos) continue

      // 只绘制一次（避免重复）
      if (roomId < connectedRoom.id) {
        ctx.beginPath()
        ctx.moveTo(pos.x, pos.y)
        ctx.lineTo(connectedPos.x, connectedPos.y)
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)'
        ctx.lineWidth = 2
        ctx.stroke()

        // 绘制方向箭头
        const angle = Math.atan2(connectedPos.y - pos.y, connectedPos.x - pos.x)
        const midX = (pos.x + connectedPos.x) / 2
        const midY = (pos.y + connectedPos.y) / 2
        drawArrow(ctx, midX, midY, angle, 'rgba(100, 200, 255, 0.5)')
      }
    }
  }

  // 绘制房间
  for (const [roomId, pos] of Object.entries(ROOM_POSITIONS)) {
    const room = world.rooms[roomId]
    if (!room) continue

    const isCurrent = roomId === currentRoom.id

    // 房间背景
    ctx.beginPath()
    ctx.roundRect(pos.x - ROOM_SIZE / 2, pos.y - ROOM_SIZE / 2, ROOM_SIZE, ROOM_SIZE, 12)

    if (isCurrent) {
      ctx.fillStyle = '#4a9eff'
      ctx.shadowColor = '#4a9eff'
      ctx.shadowBlur = 20
    } else {
      ctx.fillStyle = '#2a2a4a'
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
    }
    ctx.fill()

    // 重置阴影
    ctx.shadowBlur = 0

    // 边框
    ctx.strokeStyle = isCurrent ? '#7bb8ff' : 'rgba(100, 200, 255, 0.3)'
    ctx.lineWidth = isCurrent ? 3 : 1
    ctx.stroke()

    // 房间名称
    ctx.fillStyle = isCurrent ? '#ffffff' : '#aabbcc'
    ctx.font = 'bold 16px "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(room.name, pos.x, pos.y - 8)

    // 房间 ID（小字）
    ctx.fillStyle = isCurrent ? 'rgba(255,255,255,0.6)' : 'rgba(170,187,204,0.4)'
    ctx.font = '12px "Microsoft YaHei", sans-serif'
    ctx.fillText(room.id, pos.x, pos.y + 16)

    // 当前房间标记
    if (isCurrent) {
      ctx.fillStyle = '#ffd700'
      ctx.font = 'bold 14px sans-serif'
      ctx.fillText('▼ 当前位置', pos.x, pos.y + ROOM_SIZE / 2 + 20)
    }
  }
}

function drawArrow(ctx, x, y, angle, color) {
  const size = 10
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.beginPath()
  ctx.moveTo(size, 0)
  ctx.lineTo(-size, -size / 2)
  ctx.lineTo(-size, size / 2)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}

export default GameMap
