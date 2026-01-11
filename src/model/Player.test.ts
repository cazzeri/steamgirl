import { describe, it, expect } from 'vitest'
import { Player } from './Player'
import type { PlayerData } from './Player'
import { Item } from './Item'

describe('Player', () => {
  it('should create a new Player with 20 crowns', () => {
    const player = new Player()
    
    expect(player).toBeDefined()
    expect(player.name).toBe('Unnamed Player')
    expect(player.inventory).toBeDefined()
    expect(player.inventory.length).toBe(1)
    expect(player.inventory[0].id).toBe('crown')
    expect(player.inventory[0].number).toBe(20)
  })

  it('should serialize and deserialize inventory correctly', () => {
    const player = new Player()
    player.name = 'TestPlayer'
    player.inventory = [
      new Item('test-item', 1),
      new Item('crown', 5),
    ]
    
    const playerData = player.toJSON()
    expect(playerData.inventory).toBeDefined()
    expect(playerData.inventory).toHaveLength(2)
    expect(playerData.inventory[0].id).toBe('test-item')
    expect(playerData.inventory[0].number).toBe(1)
    expect(playerData.inventory[1].id).toBe('crown')
    expect(playerData.inventory[1].number).toBe(5)
    
    const deserialized = Player.fromJSON(playerData)
    expect(deserialized.inventory.length).toBe(2)
    expect(deserialized.inventory[0].id).toBe('test-item')
    expect(deserialized.inventory[0].number).toBe(1)
    expect(deserialized.inventory[1].id).toBe('crown')
    expect(deserialized.inventory[1].number).toBe(5)
  })

  it('should handle empty inventory in serialization', () => {
    const player = new Player()
    player.inventory = []
    const playerData = player.toJSON()
    
    expect(playerData.inventory).toBeDefined()
    expect(playerData.inventory).toHaveLength(0)
    
    const deserialized = Player.fromJSON(playerData)
    expect(deserialized.inventory.length).toBe(0)
  })

  it('should handle missing inventory in deserialization (backwards compatibility)', () => {
    const playerData: PlayerData = {
      name: 'TestPlayer',
      stats: {
        agility: 1,
        brawn: 2,
        wits: 3,
        charm: 4,
      },
      // inventory is missing
    }
    
    const player = Player.fromJSON(playerData)
    expect(player.inventory.length).toBe(0)
    expect(player.name).toBe('TestPlayer')
  })

  it('should handle round-trip serialization with inventory', () => {
    const player1 = new Player()
    player1.name = 'TestPlayer'
    player1.inventory = [
      new Item('test-item', 1),
      new Item('crown', 10),
    ]
    
    // First round-trip
    const json1 = JSON.stringify(player1.toJSON())
    const player2 = Player.fromJSON(JSON.parse(json1))
    const json2 = JSON.stringify(player2.toJSON())
    
    // Second round-trip
    const player3 = Player.fromJSON(JSON.parse(json2))
    const json3 = JSON.stringify(player3.toJSON())
    
    // All JSON should be identical
    expect(json1).toBe(json2)
    expect(json2).toBe(json3)
    
    // Verify inventory is preserved
    expect(player3.inventory.length).toBe(2)
    expect(player3.inventory[0].id).toBe('test-item')
    expect(player3.inventory[0].number).toBe(1)
    expect(player3.inventory[1].id).toBe('crown')
    expect(player3.inventory[1].number).toBe(10)
  })
})
