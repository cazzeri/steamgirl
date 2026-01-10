import { Game } from '../model/Game'
import { makeScripts } from '../model/Scripts'
import { runScript } from '../model/Scripts'

export const startScripts = {
  start: (g: Game) => {
    g.player.name = 'NewPlayer'
    g.addText('Steam hisses as the train grinds to a halt. You step onto the platform of New Victoria Station, your boots clinking against the brass-plated floor.')
    g.addText('The air is thick with the smell of coal and oil. Through the steam, you can see the grand station—a marvel of engineering with gears visible through glass panels in the walls.')
    g.addText('Your adventure begins here. Where will you go?')
    g.addOption('goToCity', {}, 'Go to the City')
    g.addOption('stationStay', {}, 'Stay at the Station')
  },
  goToCity: (g: Game) => {
    runScript('go', g, { location: 'default', time: 5 })
    g.addText('You leave the station and make your way into the city. The walk takes about 15 minutes through the industrial district.')
    g.addText('The air is thick with the smell of oil and coal. Clockwork automatons patrol the streets, their gears visible through glass panels in their chests.')
    g.addOption('start-3')
  },
  stationStay: (g: Game) => {
    g.addText('You decide to explore the station a bit more. The platform stretches out before you, with various vendors and travelers bustling about.')
    g.addText('A mechanical ticket inspector with clockwork eyes approaches, checking the brass tickets of passengers.')
    g.addOption('goToCity', {}, 'Go to the City')
  },
  'start-3': (g: Game) => {
    g.addText('A figure approaches from the shadows—a woman with mechanical enhancements, her left arm replaced with intricate brass gears and copper wiring.')
    g.addText('Before you can speak, she disappears back into the steam-filled alleys. You stand alone on the cobblestones, wondering what to do next.')
    g.addOption('startExplore', {}, 'Explore the Streets')
    g.addOption('start-4', {}, 'Wait for Her Return')
  },
  startExplore: (g: Game) => {
    // Advance time by 12 minutes (720 seconds)
    runScript('timeLapse', g, { seconds: 12 * 60 })
    
    // Random street encounters for flavor
    const encounters = [
      'A brass-plated messenger automaton whirs past, its mechanical legs clicking rhythmically against the stones. It pays you no mind, focused solely on its delivery route.',
      'You spot a street vendor polishing a collection of glowing brass trinkets. The warm amber light from the devices casts dancing shadows across her weathered face.',
      'A steam-powered carriage rumbles by, its copper pipes releasing plumes of vapour. Through the mist, you catch a glimpse of elegantly dressed passengers in Victorian finery.',
      'An old clockmaker sits on a stoop, adjusting the gears of a pocket watch with delicate precision. He looks up and tips his brass bowler hat in your direction.',
      'A group of children with mechanical toys chase each other down the street. One child\'s tin soldier marches in perfect formation, its tiny gears whirring.',
      'You notice a stray gear on the ground, still warm to the touch. It seems to be from a larger mechanism, perhaps fallen from one of the overhead steam pipes.',
      'A mechanical bird with copper wings perches on a lamppost, its mechanical chirping blending with the ambient sounds of the city. It tilts its head to observe you curiously.',
    ]
    
    const randomEncounter = encounters[Math.floor(Math.random() * encounters.length)]
    
    g.addText('You decide to explore the streets, taking in the sights and sounds of New Victoria.')
    g.addText(randomEncounter)
    g.addText('After this brief moment, you consider your options.')
    g.addOption('startExplore', {}, 'Explore More')
    g.addOption('start-4', {}, 'Continue with the Story')
  },
  'start-4': (g: Game) => {
    g.addText('"Welcome to New Victoria," she says, her voice a mix of human warmth and mechanical precision. "Your adventure begins now."')
    // No options - this is the end of the introduction
  },
}

// Register all start scripts when module loads
makeScripts(startScripts)
