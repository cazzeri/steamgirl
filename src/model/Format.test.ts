import { describe, it, expect } from 'vitest'
import { txt, p, colour, option } from './Format'

describe('Format', () => {
  describe('txt', () => {
    it('should create a text SceneContentItem', () => {
      const result = txt('Hello world')
      expect(result).toEqual({
        type: 'text',
        text: 'Hello world',
      })
    })
  })

  describe('p', () => {
    it('should create a text SceneContentItem with single argument', () => {
      const result = p('Paragraph text')
      expect(result).toEqual({
        type: 'text',
        text: 'Paragraph text',
      })
    })

    it('should create multiple text SceneContentItems with multiple arguments', () => {
      const result = p('First paragraph', 'Second paragraph', 'Third paragraph')
      expect(result).toEqual([
        { type: 'text', text: 'First paragraph' },
        { type: 'text', text: 'Second paragraph' },
        { type: 'text', text: 'Third paragraph' },
      ])
    })

    it('should handle two arguments', () => {
      const result = p('Line one', 'Line two')
      expect(result).toEqual([
        { type: 'text', text: 'Line one' },
        { type: 'text', text: 'Line two' },
      ])
    })
  })

  describe('colour', () => {
    it('should create a colored text SceneContentItem', () => {
      const result = colour('Red text', '#ff0000')
      expect(result).toEqual({
        type: 'text',
        text: 'Red text',
        color: '#ff0000',
      })
    })

    it('should handle different color formats', () => {
      const result = colour('Blue text', 'blue')
      expect(result).toEqual({
        type: 'text',
        text: 'Blue text',
        color: 'blue',
      })
    })
  })

  describe('option', () => {
    it('should create a button SceneOptionItem with script name', () => {
      const result = option('nextScene')
      expect(result).toEqual({
        type: 'button',
        script: ['nextScene', {}],
      })
    })

    it('should create a button SceneOptionItem with params', () => {
      const result = option('go', { location: 'city', time: 10 })
      expect(result).toEqual({
        type: 'button',
        script: ['go', { location: 'city', time: 10 }],
      })
    })

    it('should create a button SceneOptionItem with label', () => {
      const result = option('nextScene', {}, 'Continue')
      expect(result).toEqual({
        type: 'button',
        script: ['nextScene', {}],
        label: 'Continue',
      })
    })

    it('should create a button SceneOptionItem with params and label', () => {
      const result = option('go', { location: 'city', time: 15 }, 'Go to City')
      expect(result).toEqual({
        type: 'button',
        script: ['go', { location: 'city', time: 15 }],
        label: 'Go to City',
      })
    })
  })
})
