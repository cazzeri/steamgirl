import { Button } from './Button'
import { useGame } from '../context/GameContext'
import type { SceneData, SceneOptionItem } from '../model/Game'
import { getScript } from '../model/Scripts'
import { useNavigate } from 'react-router-dom'

interface SceneOverlayProps {
  scene: SceneData
  hideEndButton?: boolean
}

export function SceneOverlay({ scene }: SceneOverlayProps) {
  const { game, runScript } = useGame()
  const navigate = useNavigate()

  const handleOption = (option: SceneOptionItem) => {
    if (option.type === 'button' && game) {
      const [scriptName, params] = option.script
      const script = getScript(scriptName)
      if (script) {
        runScript(scriptName, params)
      }
    }
  }

  const handleEnd = () => {
    navigate('/start')
  }

  const hasOptions = scene.options.length > 0

  return (
    <div className="scene-overlay">
      {scene.content.length > 0 && (
        <div className="scene-dialog">
          {scene.content.map((item, index) => {
            if (item.type === 'text') {
              return (
                <p key={index} style={item.color ? { color: item.color } : undefined}>
                  {item.text}
                </p>
              )
            }
            return null
          })}
        </div>
      )}
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
