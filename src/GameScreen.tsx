import { MouseOver } from './components/MouseOver'
import { Button } from './components/Button'

export function GameScreen() {
  return (
    <div className="game-screen">
      <div className="game-ui panel-elevated">
        <header className="game-header">
          <h1>Game Screen</h1>
          <p className="subtitle text-muted">Full-screen React view</p>
        </header>

        <main className="game-canvas canvas-framed">
          <div className="button-row">
            <MouseOver
              hoverContent={
                <div className="hover-panel">
                  <h2>Pressure Gauge</h2>
                  <p className="text-muted">
                    Standard mouse-over demo. Replace this with game tooltips, item details, etc.
                  </p>
                </div>
              }
            >
              <Button>Hover over this control</Button>
            </MouseOver>

            <Button disabled>Disabled button</Button>
          </div>
        </main>
      </div>
    </div>
  )
}

