import React from 'react'

const DIRECTION_LABELS = {
  north: '北 ↑',
  south: '南 ↓',
  east: '东 →',
  west: '西 ←'
}

const DIRECTION_ICONS = {
  north: '⬆',
  south: '⬇',
  east: '➡',
  west: '⬅'
}

function RoomPanel({ room, onDirection }) {
  if (!room) return null

  const exits = Object.keys(room.exits)

  return (
    <div className="room-panel">
      <h3 className="section-title">当前房间</h3>
      <div className="room-card">
        <div className="room-name">{room.name}</div>
        <div className="room-description">{room.description}</div>
        {exits.length > 0 && (
          <div className="room-exits">
            <span className="exits-label">出口方向：</span>
            <div className="direction-buttons">
              {exits.map(dir => (
                <button
                  key={dir}
                  className="direction-btn"
                  onClick={() => onDirection(dir)}
                  title={`向${dir}移动`}
                >
                  <span className="direction-icon">{DIRECTION_ICONS[dir]}</span>
                  <span className="direction-label">{DIRECTION_LABELS[dir]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoomPanel
