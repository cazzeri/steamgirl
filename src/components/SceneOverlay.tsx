import { Button } from './Button'
import { useGame } from '../context/GameContext'
import type { SceneData, SceneOptionItem } from '../model/Game'
import { getScript } from '../model/Scripts'
import { renderScene } from './Content'

interface SceneOverlayProps {
  scene: SceneData
}

export function SceneOverlay({ scene }: SceneOverlayProps) {
  const { game, runScript } = useGame()

  const handleOption = (option: SceneOptionItem) => {
    if (option.type === 'button' && game) {
      const [scriptName, params] = option.script
      const script = getScript(scriptName)
      if (script) {
        runScript(scriptName, params)
      }
    }
  }

  const hasOptions = scene.options.length > 0

  return (
    <div className="scene-overlay">
      {renderScene(scene)}
      {(hasOptions) && (
        <div className="scene-actions">
            {scene.options.map((option, index) => {
              if (option.type === 'button') {
                const [scriptName] = option.script
                const scriptExists = getScript(scriptName) !== undefined
                const buttonLabel = option.label || 'Continue'
                return (
                  <Button 
                    key={index} 
                    onClick={() => handleOption(option)}
                    disabled={!scriptExists}
                  >
                    {buttonLabel}
                  </Button>
                )
              }
              return null
            })} 
        </div>
      )}
    </div>
  )
}
