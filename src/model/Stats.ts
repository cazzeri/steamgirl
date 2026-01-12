/**
 * Stats system for the game.
 * Stats are 0-100 values that represent character attributes.
 */

export type MainStatName = 
  | 'Agility'
  | 'Perception'
  | 'Wits'
  | 'Charm'
  | 'Willpower'
  | 'Strength'

export type SkillName =
  | 'Dancing'
  | 'Fitness'
  | 'Etiquette'
  | 'Mechanics'
  | 'Flirting'
  | 'Haggling'

export type StatName = MainStatName | SkillName

/**
 * Information about a stat, including description and other metadata.
 */
export interface StatInfo {
  description: string
  basedOn?: MainStatName // For skills, indicates which main stat the skill is based on
  // Additional fields can be added here later
}

/**
 * Map of all main stat names to their information.
 */
export const MAIN_STAT_INFO: Record<MainStatName, StatInfo> = {
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
 * Map of all skill names to their information.
 */
export const SKILL_INFO: Record<SkillName, StatInfo> = {
  Dancing: {
    description: 'Your ability to move gracefully and perform dance moves.',
    basedOn: 'Agility',
  },
  Fitness: {
    description: 'Your overall physical fitness and endurance.',
    basedOn: 'Strength',
  },
  Etiquette: {
    description: 'Your knowledge of social norms and proper behavior in high society.',
    basedOn: 'Charm',
  },
  Mechanics: {
    description: 'Your understanding of mechanical devices and steam-powered technology.',
    basedOn: 'Wits',
  },
  Flirting: {
    description: 'Your ability to charm and attract romantic interest.',
    basedOn: 'Charm',
  },
  Haggling: {
    description: 'Your skill at negotiating prices and getting better deals.',
    basedOn: 'Charm',
  },
}

/**
 * List of all main stat names (for initialization).
 */
export const STAT_NAMES: MainStatName[] = Object.keys(MAIN_STAT_INFO) as MainStatName[]

/**
 * List of all skill names (for iteration).
 */
export const SKILL_NAMES: SkillName[] = Object.keys(SKILL_INFO) as SkillName[]

/**
 * Type for stat modifiers - a function that modifies stats.
 * Receives the current stats map and can modify values.
 */
export type StatModifier = (stats: Map<StatName, number>) => void
