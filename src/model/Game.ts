import { Player, type PlayerData } from './Player'

export interface GameData {
  version: number
  score?: number
  player: PlayerData
}

export class Game {
  version: number
  score?: number
  player: Player

  constructor() {
    this.version = 1
    this.score = 0
    this.player = new Player()
  }

  toJSON(): GameData {
    return {
      version: this.version,
      score: this.score,
      player: this.player.toJSON(),
    }
  }

  static fromJSON(json: string | GameData): Game {
    const data = typeof json === 'string' ? JSON.parse(json) : json
    const game = new Game()
    game.version = data.version
    game.score = data.score
    game.player = Player.fromJSON(data.player)
    return game
  }
}

