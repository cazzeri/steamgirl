export interface Stats {
  agility: number
  brawn: number
  wits: number
  charm: number
}

export interface PlayerData {
  name: string
  stats: Stats
}

/** Represents the player character with name and JSON serialization capabilities. */
export class Player {
  name: string
  stats: Stats

  constructor() {
    this.name = "Unnamed Player"
    this.stats = {
      agility: 0,
      brawn: 0,
      wits: 0,
      charm: 0,
    }
  }

  toJSON(): PlayerData {
    return {
      name: this.name,
      stats: this.stats,
    }
  }

  static fromJSON(json: string | PlayerData): Player {
    const data = typeof json === 'string' ? JSON.parse(json) : json
    const player = new Player()
    player.name = data.name
    if (data.stats) {
      player.stats = data.stats
    }
    return player
  }
}

