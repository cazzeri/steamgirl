export interface PlayerData {
  name?: string
}

export class Player {
  name?: string

  constructor() {
    this.name = undefined
  }

  toJSON(): PlayerData {
    return {
      name: this.name,
    }
  }

  static fromJSON(json: string | PlayerData): Player {
    const data = typeof json === 'string' ? JSON.parse(json) : json
    const player = new Player()
    player.name = data.name
    return player
  }
}

