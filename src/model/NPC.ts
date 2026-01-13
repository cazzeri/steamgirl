import { Game } from "./Game"

export type NPCId = string

// Mutable data for an NPC, used for serialization
export interface NPCData {
  id?: NPCId
  // Add mutable state properties here as needed
}

// Static / library information for an NPC
export interface NPCDefinition {
  name?: string
  description?: string
  image?: string
  // Generate function that creates the NPC instance when first accessed
  generate: (game: Game) => NPC
}

/** Represents a game NPC instance with mutable state. Definitional data is accessed via the template property. */
export class NPC {
  id: NPCId

  constructor(id: NPCId) {
    this.id = id
  }

  /** Gets the NPC definition template. */
  get template(): NPCDefinition {
    const definition = NPC_DEFINITIONS[this.id]
    if (!definition) {
      throw new Error(`NPC definition not found: ${this.id}`)
    }
    return definition
  }

  toJSON(): NPCData {
    // Only serialize mutable state and id
    return {
      id: this.id,
    }
  }

  static fromJSON(json: string | NPCData, game: Game): NPC {
    const data = typeof json === 'string' ? JSON.parse(json) : json
    const npcId = data.id
    
    if (!npcId) {
      throw new Error('NPC.fromJSON requires an id')
    }
    
    // Verify definition exists
    if (!NPC_DEFINITIONS[npcId]) {
      throw new Error(`NPC definition not found: ${npcId}`)
    }
    
    // Use the generate function to create the NPC instance
    const npc = NPC_DEFINITIONS[npcId].generate(game)
    
    // Apply any serialized mutable state here if needed
    
    return npc
  }
}

// NPC definitions registry
// NPCs can be added from various story modules
const NPC_DEFINITIONS: Record<NPCId, NPCDefinition> = {}

// Register NPC definitions (can be called from story modules)
export function registerNPC(id: NPCId, definition: NPCDefinition): void {
  NPC_DEFINITIONS[id] = definition
}

// Get an NPC definition by id
export function getNPCDefinition(id: NPCId): NPCDefinition | undefined {
  return NPC_DEFINITIONS[id]
}
