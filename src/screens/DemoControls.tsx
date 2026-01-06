import { MouseOver } from '../components/MouseOver'
import { Button } from '../components/Button'

export function DemoControls() {
  return (
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
        <Button color="#f97316">Hover over this control</Button>
      </MouseOver>

      <Button disabled>Disabled button</Button>
    </div>
  )
}


