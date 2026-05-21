import React from 'react'

function GameLog({ logs, logEndRef }) {
  return (
    <div className="game-log">
      <h3 className="section-title">游戏日志</h3>
      <div className="log-container">
        {logs.length === 0 ? (
          <div className="log-empty">暂无日志...</div>
        ) : (
          logs.map((log, index) => (
            <div
              key={log.timestamp + '-' + index}
              className={`log-entry log-${log.type}`}
            >
              {log.message.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}

export default GameLog
