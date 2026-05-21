import React from 'react'

// 小地图房间位置（简化布局）
const MINI_POSITIONS = {
  start: { x: 80, y: 80 },
  north: { x: 80, y: 20 },
  south: { x: 80, y: 140 },
  east: { x: 140, y: 80 },
  west: { x: 20, y: 80 }
}

const MINI_ROOM_SIZE = 30

function MiniMap({ world, currentRoom, onRoomClick }) {
  return (
    <div className="minimap">
      <h3 className="section-title">小地图</h3>
      <svg className="minimap-svg" viewBox="0 0 160 160" width="160" height="160">
        {/* 背景 */}
        <rect x="0" y="0" width="160" height="160" fill="#1a1a2e" rx="8" />

        {/* 连接线 */}
        {Object.entries(MINI_POSITIONS).map(([roomId, pos]) => {
          const room = world.rooms[roomId]
          if (!room) return null
          return Object.entries(room.exits).map(([dir, connectedRoom]) => {
            const connectedPos = MINI_POSITIONS[connectedRoom.id]
            if (!connectedPos || roomId > connectedRoom.id) return null
            return (
              <line
                key={`${roomId}-${dir}`}
                x1={pos.x}
                y1={pos.y}
                x2={connectedPos.x}
                y2={connectedPos.y}
                stroke="rgba(100, 200, 255, 0.3)"
                strokeWidth="1.5"
              />
            )
          })
        })}

        {/* 房间 */}
        {Object.entries(MINI_POSITIONS).map(([roomId, pos]) => {
          const room = world.rooms[roomId]
          if (!room) return null
          const isCurrent = roomId === currentRoom.id

          return (
            <g key={roomId} onClick={() => onRoomClick(roomId)} style={{ cursor: 'pointer' }}>
              <rect
                x={pos.x - MINI_ROOM_SIZE / 2}
                y={pos.y - MINI_ROOM_SIZE / 2}
                width={MINI_ROOM_SIZE}
                height={MINI_ROOM_SIZE}
                rx="6"
                fill={isCurrent ? '#4a9eff' : '#2a2a4a'}
                stroke={isCurrent ? '#7bb8ff' : 'rgba(100, 200, 255, 0.3)'}
                strokeWidth={isCurrent ? 2 : 1}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill={isCurrent ? '#fff' : '#aabbcc'}
                fontSize="9"
                fontFamily="Microsoft YaHei, sans-serif"
              >
                {room.name.length > 2 ? room.name.slice(0, 2) : room.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default MiniMap
