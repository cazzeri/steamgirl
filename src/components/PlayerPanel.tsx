import { Button } from './Button'
import { useNavigate } from 'react-router-dom'

export function PlayerPanel() {
  const navigate = useNavigate()

  return (
    <div className="player-panel panel-elevated" style={{ height: '100%' }}>
      <div className="avatar-container">
        <div className="avatar-frame">
          <div className="rivet rivet-tl"></div>
          <div className="rivet rivet-tr"></div>
          <div className="rivet rivet-bl"></div>
          <div className="rivet rivet-br"></div>
          <div className="avatar-rivet avatar-rivet-bl"></div>
          <div className="avatar-rivet avatar-rivet-br"></div>
          <div className="avatar-placeholder">
            {/* Player picture will go here (256x256) */}
          </div>
        </div>
      </div>

      <main className="game-canvas canvas-framed" >
        {/* Player status, options, inventory will go here */}
      </main>

      <div className="dev-controls">
        <Button onClick={() => navigate('/start')}>
          Home
        </Button>
      </div>
    </div>
  )
}
