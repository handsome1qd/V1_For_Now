import React, { useState } from 'react'

function CommandBar({ onCommand, onDirection, currentRoom }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onCommand(input.trim())
      setInput('')
    }
  }

  const handleQuickCommand = (cmd) => {
    onCommand(cmd)
  }

  return (
    <div className="command-bar">
      <h3 className="section-title">命令控制</h3>

      {/* 快捷命令按钮 */}
      <div className="quick-commands">
        <button className="quick-btn" onClick={() => handleQuickCommand('look')}>
          👁 查看
        </button>
        <button className="quick-btn" onClick={() => handleQuickCommand('help')}>
          ❓ 帮助
        </button>
      </div>

      {/* 方向快捷按钮 */}
      <div className="direction-pad">
        <div className="direction-row">
          <button
            className="dir-pad-btn north"
            onClick={() => onDirection('north')}
            disabled={!currentRoom?.exits?.north}
            title="向北移动"
          >
            ↑ 北
          </button>
        </div>
        <div className="direction-row">
          <button
            className="dir-pad-btn west"
            onClick={() => onDirection('west')}
            disabled={!currentRoom?.exits?.west}
            title="向西移动"
          >
            ← 西
          </button>
          <button
            className="dir-pad-btn south"
            onClick={() => onDirection('south')}
            disabled={!currentRoom?.exits?.south}
            title="向南移动"
          >
            ↓ 南
          </button>
          <button
            className="dir-pad-btn east"
            onClick={() => onDirection('east')}
            disabled={!currentRoom?.exits?.east}
            title="向东移动"
          >
            东 →
          </button>
        </div>
      </div>

      {/* 文本命令输入 */}
      <form className="command-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="command-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入命令 (如: go north, look, help)..."
          autoFocus
        />
        <button type="submit" className="command-submit">发送</button>
      </form>
    </div>
  )
}

export default CommandBar
