import { Item, type ItemData } from './Item'

export interface Stats {
  agility: number
  brawn: number
  wits: number
  charm: number
}

export interface PlayerData {
  name: string
  stats: Stats
  inventory?: ItemData[]
}

/** Represents the player character with name and JSON serialization capabilities. */
export class Player {
  name: string
  stats: Stats
  inventory: Item[]

  constructor() {
    this.name = "Unnamed Player"
    this.stats = {
      agility: 0,
      brawn: 0,
      wits: 0,
      charm: 0,
    }
    this.inventory = []
    // Initialize with 20 crowns
    this.inventory.push(new Item('crown', 20))
  }

  toJSON(): PlayerData {
    return {
      name: this.name,
      stats: this.stats,
      inventory: this.inventory.map(item => item.toJSON()),
    }
  }

  static fromJSON(json: string | PlayerData): Player {
    const data = typeof json === 'string' ? JSON.parse(json) : json
    const player = new Player()
    player.name = data.name
    if (data.stats) {
      player.stats = data.stats
    }
    if (data.inventory) {
      player.inventory = data.inventory.map((itemData: ItemData) => Item.fromJSON(itemData))
    } else {
      // If inventory is missing, clear the default inventory from constructor
      player.inventory = []
    }
    return player
  }
}

