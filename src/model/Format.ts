import type { SceneContentItem, SceneOptionItem } from './Game'

/** Creates a text content item. */
export function txt(text: string): SceneContentItem {
  return { type: 'text', text }
}

/** Creates paragraph text content items. Accepts variadic arguments - multiple texts create multiple items. */
export function p(...texts: string[]): SceneContentItem | SceneContentItem[] {
  if (texts.length === 0) {
    throw new Error('p() requires at least one text argument')
  }
  if (texts.length === 1) {
    return { type: 'text', text: texts[0] }
  }
  return texts.map(text => ({ type: 'text', text }))
}

/** Creates a colored text content item. */
export function colour(text: string, color: string): SceneContentItem {
  return { type: 'text', text, color }
}

/** Creates a button option that runs a script. */
export function option(scriptName: string, params: {} = {}, label?: string): SceneOptionItem {
  return { type: 'button', script: [scriptName, params], label }
}
