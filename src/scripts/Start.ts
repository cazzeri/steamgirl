import { Game } from '../model/Game'
import { makeScript } from '../model/Scripts'

export function registerStartScript() {
  makeScript('start', (game: Game) => {
    game.player.name = 'NewPlayer'
  })
}

// Register the script when module loads
registerStartScript()
