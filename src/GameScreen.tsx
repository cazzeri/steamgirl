import { DemoControls } from './screens/DemoControls'

export function GameScreen() {
  return (
    <div className="game-screen">
      <div className="game-ui panel-elevated">
        <header className="game-header">
          <h1>Game Screen</h1>
          <p className="subtitle text-muted">Full-screen React view</p>
        </header>

        <main className="game-canvas canvas-framed">
          <DemoControls />
        </main>
      </div>
    </div>
  )
}

