import { Game } from '../model/Game'
import type { CardDefinition } from '../model/Card'
import type { Card } from '../model/Card'
import { registerCardDefinition } from '../model/Card'

export const intoxicatedEffect: CardDefinition = {
  name: 'Intoxicated',
  description: 'You feel lightheaded and giddy from the wine.',
  type: 'Effect',
  color: '#9333ea', // Purple
  onTime: (game: Game, card: Card, seconds: number) => {
    // Calculate the number of 15-minute (900 second) boundaries crossed
    const ticks = game.calcTicks(seconds, 900)
    // Reduce alcohol by 10 for each boundary crossed
    const reduction = ticks * 10
    if (reduction > 0) {
      const currentAlcohol = (card.alcohol as number) || 0
      const newAlcohol = Math.max(0, currentAlcohol - reduction)
      card.alcohol = newAlcohol
      
      if (newAlcohol <= 0) {
        // Remove the effect
        const index = game.player.cards.findIndex(c => c.id === card.id && c.type === 'Effect')
        if (index !== -1) {
          game.player.cards.splice(index, 1)
          game.add({ type: 'text', text: 'You are no longer intoxicated' })
        }
      }
    }
  },
}

export const sleepyEffect: CardDefinition = {
  name: 'Sleepy',
  description: 'You feel tired and drowsy.',
  type: 'Effect',
  color: '#3b82f6', // Blue
}

// Register the effect definitions
registerCardDefinition('intoxicated', intoxicatedEffect)
registerCardDefinition('sleepy', sleepyEffect)

/** 
 * Consume alcohol script - adds alcohol amount to the player's intoxicated effect.
 * Adds the intoxicated effect if the player doesn't have it.
 * Adds to existing alcohol value if the player already has the effect.
 */
export function consumeAlcohol(game: Game, amount: number): void {
  // Find existing intoxicated effect
  const intoxicatedCard = game.player.cards.find(card => card.id === 'intoxicated' && card.type === 'Effect')
  
  if (intoxicatedCard) {
    // Add to existing alcohol value
    const currentAlcohol = (intoxicatedCard.alcohol as number) || 0
    intoxicatedCard.alcohol = currentAlcohol + amount
  } else {
    // Add new intoxicated effect with the alcohol amount
    game.addEffect('intoxicated', { alcohol: amount })
  }
}
