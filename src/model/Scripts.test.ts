import { describe, it, expect, beforeEach } from 'vitest'
import { Game } from './Game'
import { makeScript, runScript} from './Scripts'

describe('Scripts', () => {

  it('should run a script on a new Game', () => {
    // Register a simple test script
    makeScript('testScript', (game, params) => {
      return {
        gameVersion: game.version,
        score: game.score,
        params,
      }
    })

    // Create a new game
    const game = new Game()

    // Run the script
    const result = runScript('testScript', game, { testParam: 'value' })

    // Verify the script executed correctly
    expect(result).toBeDefined()
    expect(result.gameVersion).toBe(1)
    expect(result.score).toBe(0)
    expect(result.params).toEqual({ testParam: 'value' })
  })
})
