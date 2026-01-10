import { CenteredContent } from './CenteredContent'
import { SceneOverlay } from './SceneOverlay'
import { Location } from '../model/Location'
import { useGame } from '../context/GameContext'

interface LocationViewProps {
  location: Location | null
}

export function LocationView({ location }: LocationViewProps) {
  const { game } = useGame()
  const locationImage = location?.image
  const scene = game?.scene

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <CenteredContent>
        {locationImage ? (
          <img 
            src={locationImage} 
            alt={location?.name || 'Location'} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <p>No Location</p>
        )}
      </CenteredContent>
      {scene && scene.content.length > 0 && <SceneOverlay scene={scene} />}
    </div>
  )
}
