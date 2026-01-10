import { Player, type PlayerData } from './Player'
import { Location, type LocationData, getLocation } from './Location'

export type SceneContentItem = 
  | { type: 'text'; text: string }

export type SceneOptionItem = 
  | { type: 'button'; script: [string, {}]; label?: string }

export type SceneData = {
  type: 'story'
  content: SceneContentItem[]
  options: SceneOptionItem[]
}

export interface GameData {
  version: number
  score: number
  player: PlayerData
  locations: Record<string, LocationData>
  currentLocation?: string
  scene: SceneData
  time: number
}

/** Main game state container that manages version, score, and player data with JSON serialization support. */
export class Game {
  version: number
  score: number
  player: Player
  locations: Map<string, Location>
  currentLocation: string
  scene: SceneData
  time: number

  constructor() {
    this.version = 1
    this.score = 0
    this.player = new Player()
    this.locations = new Map<string, Location>()
    this.currentLocation = 'station'
    this.scene = {
      type: 'story',
      content: [],
      options: [],
    }
    
    // Initialize time to noon on January 1, 1902 (unix timestamp in seconds)
    // JavaScript Date: year, month (0-indexed), day, hours, minutes, seconds
    const startDate = new Date(1902, 0, 1, 12, 0, 0)
    this.time = Math.floor(startDate.getTime() / 1000)
    
    // Initialize with station location from registry
    this.ensureLocation('station')
  }

  get location(): Location | null {
    return this.locations.get(this.currentLocation) ?? null
  }

  /** Ensures a location exists in the game's locations map, pulling from registry if needed. */
  ensureLocation(locationId: string): void {
    if (!this.locations.has(locationId)) {
      const locationFromRegistry = getLocation(locationId)
      if (locationFromRegistry) {
        // Create a copy to avoid mutating the registry
        const location = new Location()
        location.id = locationFromRegistry.id
        location.name = locationFromRegistry.name
        location.image = locationFromRegistry.image
        this.locations.set(locationId, location)
      }
    }
  }

  /** Add a text content item to the current scene. */
  addText(text: string): void {
    this.scene.content.push({ type: 'text', text })
  }

  /** Add an option button to the current scene that runs a script. */
  addOption(scriptName: string, params: {} = {}, label?: string): void {
    this.scene.options.push({ type: 'button', script: [scriptName, params], label })
  }

  /** Clear the current scene (resets content and options). */
  clearScene(): void {
    this.scene = {
      type: 'story',
      content: [],
      options: [],
    }
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
      scene: this.scene,
      time: this.time,
    }
  }

  static fromJSON(json: string | GameData): Game {
    // Use Partial<> for backwards compatibility with old saves that might be missing required fields
    const data = typeof json === 'string' ? JSON.parse(json) : json as Partial<GameData> & { version: number; player: PlayerData }
    const game = new Game() 
    game.version = data.version
    game.score = data.score ?? 0
    game.player = Player.fromJSON(data.player)
    game.currentLocation = data.currentLocation ?? 'default'
    game.time = data.time ?? game.time // Use provided time or keep default from constructor
    
    // Handle scene deserialization - migrate old format or use new format
    if (data.scene) {
      if ('type' in data.scene && data.scene.type === 'story') {
        // New format
        game.scene = data.scene as SceneData
      } else if ('dialog' in data.scene || 'next' in data.scene) {
        // Old format - migrate to new format
        const oldScene = data.scene as { dialog?: string; next?: string }
        game.scene = {
          type: 'story',
          content: oldScene.dialog ? [{ type: 'text', text: oldScene.dialog }] : [],
          options: oldScene.next ? [{ type: 'button', script: [oldScene.next, {}] }] : [],
        }
      }
      // If scene exists but doesn't match expected format, keep default from constructor
    }
    
    // Deserialize locations map
    if (data.locations) {
      game.locations = new Map<string, Location>()
      Object.entries(data.locations).forEach(([id, locationData]) => {
        const location = Location.fromJSON(locationData as LocationData)
        location.id = id
        game.locations.set(id, location)
      })
    }
    
    // Ensure currentLocation exists in the map, fallback to registry if missing
    game.ensureLocation(game.currentLocation)
    
    return game
  }
}

