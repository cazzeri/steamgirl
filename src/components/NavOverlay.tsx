import { useGame } from '../context/GameContext'
import { getLocation } from '../model/Location'
import { Thumbnail } from './Thumbnail'
import type { LocationLink } from '../model/Location'

export function NavOverlay() {
  const { game, runScript } = useGame()
  const links = game.location.template.links || []
  const currentMain = game.location.template.mainLocation === true

  if (links.length === 0) {
    return null
  }

  const handleLocationClick = (link: LocationLink) => {
    if (link.checkAccess) {
      const accessReason = link.checkAccess(game)
      if (accessReason) {
        game.add(accessReason)
        return
      }
    }
    runScript('go', { location: link.dest, minutes: link.time })
  }

  // Filter to discovered only, then split into Travel (both main) vs Places (rest)
  const discovered = links.filter((link) => game.getLocation(link.dest).discovered)

  const travelLinks: LocationLink[] = []
  const placeLinks: LocationLink[] = []
  for (const link of discovered) {
    const destDef = getLocation(link.dest)
    const destMain = destDef?.mainLocation === true
    if (currentMain && destMain) {
      travelLinks.push(link)
    } else {
      placeLinks.push(link)
    }
  }

  if (travelLinks.length === 0 && placeLinks.length === 0) {
    return null
  }

  const renderGroup = (title: string, groupLinks: LocationLink[]) => {
    if (groupLinks.length === 0) return null
    return (
      <div className="nav-group" key={title}>
        <div className="nav-group-title">{title}</div>
        <div className="nav-group-links">
          {groupLinks.map((link, index) => {
            const targetLocation = getLocation(link.dest)
            if (!targetLocation) return null
            const accessReason = link.checkAccess ? link.checkAccess(game) : null
            const isDisabled = !!accessReason
            const displayName = link.label ?? targetLocation.name ?? link.dest
            return (
              <Thumbnail
                key={`${link.dest}-${index}`}
                image={targetLocation.image}
                name={displayName}
                subtitle={`${link.time} min`}
                onClick={() => handleLocationClick(link)}
                title={`${displayName} (${link.time} min)`}
                disabled={isDisabled}
                disabledReason={accessReason || undefined}
              />
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="nav-links">
      {renderGroup('Places', placeLinks)}
      {renderGroup('Travel', travelLinks)}
    </div>
  )
}
