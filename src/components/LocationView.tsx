import { CenteredContent } from './CenteredContent'
import { Location } from '../model/Location'

interface LocationViewProps {
  location: Location | null
}

export function LocationView({ location }: LocationViewProps) {
  const locationImage = location?.image

  return (
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
  )
}
