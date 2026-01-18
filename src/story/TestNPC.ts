import { Game } from '../model/Game'
import { registerNPC } from '../model/NPC'

// Register test NPC
registerNPC('test-npc', {
  name: 'Test NPC',
  description: 'A test NPC for testing purposes.',
  // generate is optional - using default NPC instance
  onApproach: (game: Game) => {
    game.add('Test NPC says: "Hello! How can I help you?"')
  },
})
