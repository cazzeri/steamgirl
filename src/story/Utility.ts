import { Game } from '../model/Game'
import { makeScripts, runScript } from '../model/Scripts'
import { getLocation } from '../model/Location'

export const utilityScripts = {
  timeLapse: (game: Game, params: { seconds?: number } = {}) => {
    const seconds = params.seconds ?? 0
    if (typeof seconds !== 'number' || seconds < 0) {
      throw new Error('timeLapse requires a non-negative number of seconds')
    }
    game.time += seconds
  },
  
  go: (game: Game, params: { location?: string; time?: number } = {}) => {
    const locationId = params.location
    if (!locationId || typeof locationId !== 'string') {
      throw new Error('go script requires a location parameter')
    }
    
    // Check if location exists in registry
    const locationFromRegistry = getLocation(locationId)
    if (!locationFromRegistry) {
      throw new Error(`Location not found: ${locationId}`)
    }
    
    // Ensure location exists in game's locations map
    game.ensureLocation(locationId)
    
    // Change current location
    game.currentLocation = locationId
    
    // Advance time if provided (time is in minutes)
    if (params.time !== undefined) {
      const minutes = params.time
      if (typeof minutes !== 'number' || minutes < 0) {
        throw new Error('go script time parameter must be a non-negative number of minutes')
      }
      runScript('timeLapse', game, { seconds: minutes * 60 })
    }
  },
}

// Register all utility scripts when module loads
makeScripts(utilityScripts)
