/**
 * Stats system for the game.
 * Stats are 0-100 values that represent character attributes.
 */

export type StatName = 
  | 'Agility'
  | 'Perception'
  | 'Wits'
  | 'Charm'
  | 'Willpower'
  | 'Strength'

/**
 * List of all stat names in the game.
 */
export const STAT_NAMES: StatName[] = [
  'Agility',
  'Perception',
  'Wits',
  'Charm',
  'Willpower',
  'Strength',
]

/**
 * Type for stat modifiers - a function that modifies stats.
 * Receives the current stats map and can modify values.
 */
export type StatModifier = (stats: Map<StatName, number>) => void
