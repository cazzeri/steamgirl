import { useGame } from '../context/GameContext'

export function InventoryView() {
  const { game } = useGame()

  if (!game) {
    return null
  }

  const inventory = game.player.inventory

  if (inventory.length === 0) {
    return (
      <div className="inventory">
        <p>Inventory is empty</p>
      </div>
    )
  }

  return (
    <div className="inventory">
      <h3>Inventory</h3>
      <ul>
        {inventory.map((item, index) => {
          const itemDef = item.template
          const displayName = item.number > 1 ? `${itemDef.name} x${item.number}` : itemDef.name
          return (
            <li key={`${item.id}-${index}`}>
              {displayName}
              {itemDef.description && ` - ${itemDef.description}`}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
