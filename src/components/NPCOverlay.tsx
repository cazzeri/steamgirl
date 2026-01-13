import { useGame } from '../context/GameContext'
import { Thumbnail } from './Thumbnail'

export function NPCOverlay() {
  const { game, runScript } = useGame()

  if (!game) {
    return null
  }

  // Get NPCs present at current location
  const npcsPresent = game.npcsPresent || []
  
  if (npcsPresent.length === 0) {
    return null
  }

  const handleNPCClick = (npcId: string) => {
    if (!game) return
    
    // Use the runScript function from context which handles scene clearing and updates
    runScript('approach', { npc: npcId })
  }

  return (
    <div className="activities npcs">
      {npcsPresent.map((npcId) => {
        const npc = game.getNPC(npcId)
        const npcDef = npc.template
        
        return (
          <Thumbnail
            key={npcId}
            image={npcDef.image}
            name={npcDef.name || npcId}
            symbol="👤"
            onClick={() => handleNPCClick(npcId)}
            title={npcDef.description || npcDef.name || npcId}
          />
        )
      })}
    </div>
  )
}
