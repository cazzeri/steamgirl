export interface LocationData {
  id?: string
  name?: string
  image?: string
}

/** Represents a game location with id, name, and image, supporting JSON serialization. */
export class Location {
  id?: string
  name?: string
  image?: string

  constructor() {
    this.id = undefined
    this.name = undefined
    this.image = undefined
  }

  toJSON(): LocationData {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
    }
  }

  static fromJSON(json: string | LocationData): Location {
    const data = typeof json === 'string' ? JSON.parse(json) : json
    const location = new Location()
    location.id = data.id
    location.name = data.name
    location.image = data.image
    return location
  }
}

const LOCATIONS: Record<string, Location> = {}

export function registerLocation(id: string, location: Location): void {
  if (id in LOCATIONS) {
    throw new Error(`Duplicate location id: ${id}`)
  }
  LOCATIONS[id] = location
}

export function getLocation(id: string): Location | undefined {
  return LOCATIONS[id]
}

export function getAllLocations(): Record<string, Location> {
  return { ...LOCATIONS }
}

// Register default locations
const stationLocation = new Location()
stationLocation.id = 'station'
stationLocation.name = 'Steam Station'
stationLocation.image = '/images/station.jpg'
registerLocation('station', stationLocation)

const defaultLocation = new Location()
defaultLocation.id = 'default'
defaultLocation.name = 'Default City'
defaultLocation.image = '/images/city.jpg'
registerLocation('default', defaultLocation)

