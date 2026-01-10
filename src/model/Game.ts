import { Player, type PlayerData } from './Player'
import { Location, type LocationData, getLocation } from './Location'

export interface GameData {
  version: number
  score?: number
  player: PlayerData
  locations: Record<string, LocationData>
  currentLocation?: string
}

/** Main game state container that manages version, score, and player data with JSON serialization support. */
export class Game {
  version: number
  score?: number
  player: Player
  locations: Map<string, Location>
  currentLocation: string

  constructor() {
    this.version = 1
    this.score = 0
    this.player = new Player()
    this.locations = new Map<string, Location>()
    this.currentLocation = 'default'
    
    // Initialize with default location from registry
    const defaultLocation = getLocation('default')
    if (defaultLocation) {
      this.locations.set('default', defaultLocation)
    }
  }

  get location(): Location | null {
    return this.locations.get(this.currentLocation) ?? null
  }

  toJSON(): GameData {
    const locationsRecord: Record<string, LocationData> = {}
    this.locations.forEach((location, id) => {
      locationsRecord[id] = location.toJSON()
    })
    
    return {
      version: this.version,
      score: this.score,
      player: this.player.toJSON(),
      locations: locationsRecord,
      currentLocation: this.currentLocation,
    }
  }

  static fromJSON(json: string | GameData): Game {
    const data = typeof json === 'string' ? JSON.parse(json) : json
    const game = new Game() 
    game.version = data.version
    game.score = data.score
    game.player = Player.fromJSON(data.player)
    game.currentLocation = data.currentLocation ?? 'default'
    
    // Deserialize locations map

      game.locations = new Map<string, Location>()
      Object.entries(data.locations).forEach(([id, locationData]) => {
        const location = Location.fromJSON(locationData as LocationData)
        location.id = id
        game.locations.set(id, location)
      })

    
    // Ensure currentLocation exists in the map, fallback to registry if missing
    if (!game.locations.has(game.currentLocation)) {
      const locationFromRegistry = getLocation(game.currentLocation)
      if (locationFromRegistry) {
        game.locations.set(game.currentLocation, locationFromRegistry)
      }
    }
    
    return game
  }
}

