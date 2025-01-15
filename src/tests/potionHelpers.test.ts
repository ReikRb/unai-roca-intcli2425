import { potions } from "../data/data"
import { calculateCraftingTime, filterByLevelRequirement, findPotionByEffect, getPotionsByRarity, listIngredients } from "../helpers/potionHelpers"

describe('filterByLevelRequirement tests', () => {
    it('Should return potions under level 15 or lower', () => {
        const filtered_potions = filterByLevelRequirement(potions, 15)

        expect(filtered_potions.length).toBe(3)
        expect(filtered_potions[0].name).toBe('Elixir of Eternal Flame')
        expect(filtered_potions[1].name).toBe('Elixir of Acolyte Terror')
        expect(filtered_potions[2].name).toBe('Essence of Eternal Vitality')

    })
    it('Should not return any potion', () => {
        const filtered_potions = filterByLevelRequirement(potions, 11)

        expect(filtered_potions.length).toBe(0)
    })
})

describe('filterByRarity tests', () => {
    it('Should return potions that matches given rarity: Legendary', () => {
        const filtered_potions = getPotionsByRarity(potions, 'legendary')

        expect(filtered_potions.length).toBe(6)
    })
    it('Should return potions that matches given rarity: Epic', () => {
        const filtered_potions = getPotionsByRarity(potions, 'epic')

        expect(filtered_potions.length).toBe(2)
    })

    it('Should not return any potion', () => {
        const filtered_potions = getPotionsByRarity(potions, 'common')

        expect(filtered_potions.length).toBe(0)
    })
})

describe('listIngredients tests', () => {
    it('Should return ingredients of given potion', () => {
        const ingredients = listIngredients(potions[0])

        expect(ingredients.length).toBe(3)
        expect(ingredients[0]).toBe('Phoenix Feather')
        expect(ingredients[1]).toBe("Molten Ember")
        expect(ingredients[2]).toBe("Flameflower Extract")
    })
})


describe('findPotionByEffect tests', () => {
    it('Should return potions with given secondary effect', () => {
        const newPotionsArray = findPotionByEffect(potions, 'manaRegeneration')

        expect(newPotionsArray.length).toBe(2)
    })
})

describe('calculateCraftingTime tests', () => {
    it('Should return the minutes needed to craft all given potions', () => {
        const craftingTimeMinutes = calculateCraftingTime([potions[0],potions[1]])
        expect(craftingTimeMinutes).toBe(105)
    })

    it('Should convert potions with crafting time in hours to minutes to give proper result in minutes', () => {
        const craftingTimeMinutes = calculateCraftingTime([potions[8],potions[9], potions[0]])
        expect(craftingTimeMinutes).toBe(465)
    })
})