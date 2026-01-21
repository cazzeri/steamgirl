import type { Game } from '../model/Game'
import type { LocationId, LocationDefinition } from '../model/Location'
import { registerLocation } from '../model/Location'

const SUBWAY_FARE = 3

const checkSubwayFare = (g: Game): string | null => {
  const n = g.player.inventory.find((i) => i.id === 'crown')?.number ?? 0
  return n < SUBWAY_FARE ? 'You need 3 Krona for the subway.' : null
}

const paySubwayFare = (_g: Game, _params: {}) => {
  _g.player.removeItem('crown', SUBWAY_FARE)
}

const subwayLink = (dest: LocationId, label: string, time = 8) => ({
  dest,
  time,
  label,
  travel: true as const,
  checkAccess: checkSubwayFare,
  onFollow: paySubwayFare,
})

// Subway platforms: not mainLocation; appear as Places from main areas; travel between them as Travel
const SUBWAY_DEFINITIONS: Record<LocationId, LocationDefinition> = {
  'subway-university': {
    name: 'University Subway',
    description: 'Steam and brass; the underground platform under the university grounds.',
    image: '/images/subway.jpg',
    links: [
      subwayLink('subway-lowtown', 'To Lowtown'),
      subwayLink('subway-terminus', 'To Terminus'),
      { dest: 'school', time: 2, label: 'Exit to University' },
    ],
  },
  'subway-lowtown': {
    name: 'Lowtown Subway',
    description: 'A dim platform in the industrial depths. Trains clank and hiss.',
    image: '/images/subway.jpg',
    links: [
      subwayLink('subway-university', 'To University'),
      subwayLink('subway-terminus', 'To Terminus'),
      { dest: 'lowtown', time: 2, label: 'Exit to Lowtown' },
    ],
  },
  'subway-terminus': {
    name: 'Terminus Subway',
    description: 'The underground stop beneath Ironspark Terminus. Crowds and steam.',
    image: '/images/subway.jpg',
    links: [
      subwayLink('subway-university', 'To University'),
      subwayLink('subway-lowtown', 'To Lowtown'),
      { dest: 'station', time: 2, label: 'Exit to Terminus' },
    ],
  },
}

Object.entries(SUBWAY_DEFINITIONS).forEach(([id, def]) => registerLocation(id, def))
