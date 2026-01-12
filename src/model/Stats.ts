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
 * Information about a stat, including description and other metadata.
 */
export interface StatInfo {
  description: string
  // Additional fields can be added here later
}

/**
 * Map of all stat names to their information.
 */
export const MAIN_STAT_INFO: Record<StatName, StatInfo> = {
  Agility: {
    description: 'Your speed, reflexes, and physical coordination.',
  },
  Perception: {
    description: 'Your ability to notice details and observe your surroundings.',
  },
  Wits: {
    description: 'Your mental sharpness, problem-solving ability, and quick thinking.',
  },
  Charm: {
    description: 'Your charisma, social grace, and ability to influence others.',
  },
  Willpower: {
    description: 'Your mental fortitude, determination, and resistance to pressure.',
  },
  Strength: {
    description: 'Your physical power, muscle strength, and ability to exert force.',
  },
}

/**
 * List of all stat names in the game (for iteration).
 */
export const STAT_NAMES: StatName[] = Object.keys(MAIN_STAT_INFO) as StatName[]

/**
 * Type for stat modifiers - a function that modifies stats.
 * Receives the current stats map and can modify values.
 */
export type StatModifier = (stats: Map<StatName, number>) => void
