import { PlayerPanel } from '../components/PlayerPanel'
import { CenteredContent } from '../components/CenteredContent'

export function GameScreen() {
  return (
    <div className="game-screen">
      <PlayerPanel />
      <div style={{ flex: 1, height: '100%' }}>
        <CenteredContent>
          <p>Second column content</p>
        </CenteredContent>
      </div>
    </div>
  )
}

