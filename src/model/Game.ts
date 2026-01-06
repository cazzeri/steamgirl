export interface GameData {
  version: number
  score?: number
}

export class Game {
  version: number
  score?: number

  constructor() {
    this.version = 1
    this.score = 0
  }

  toJSON(): GameData {
    return {
      version: this.version,
      score: this.score,
    }
  }

  static fromJSON(json: string | GameData): Game {
    const data = typeof json === 'string' ? JSON.parse(json) : json
    const game = new Game()
    game.version = data.version
    game.score = data.score
    return game
  }
}

