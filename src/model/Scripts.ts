import { Game } from './Game'

export type Script = (game: Game, params: {}) => any

const SCRIPTS: Record<string, Script> = {}

export function makeScript(name: string, script: Script): void {
  if (name in SCRIPTS) {
    throw new Error(`Duplicate script name: ${name}`)
  }
  SCRIPTS[name] = script
}

export function makeScripts(scripts: Record<string, Script>): void {
  for (const [name, script] of Object.entries(scripts)) {
    makeScript(name, script)
  }
}

export function getScript(name: string): Script | undefined {
  return SCRIPTS[name]
}

export function getAllScripts(): Record<string, Script> {
  return { ...SCRIPTS }
}

