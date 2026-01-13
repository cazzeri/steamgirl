import { Game } from '../model/Game'
import { NPC, registerNPC } from '../model/NPC'

// Register test NPC
registerNPC('test-npc', {
  name: 'Test NPC',
  description: 'A test NPC for testing purposes.',
  generate: (_game: Game) => {
    return new NPC('test-npc')
  },
  onApproach: (game: Game) => {
    game.add('Test NPC says: "Hello! How can I help you?"')
  },
})
