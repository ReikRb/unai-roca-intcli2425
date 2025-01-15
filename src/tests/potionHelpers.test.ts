import { potions } from "../data/data"
import { filterByLevelRequirement } from "../helpers/potionHelpers"

describe('Potion helper tests', () => {
   it('Should return potions under level 15 or lower', () => {
       const filtered_potions = filterByLevelRequirement(potions, 15)
    
       expect(filtered_potions.length).toBe(2)
       expect(filtered_potions[0].name).toBe('Elixir of Eternal Flame')
       expect(filtered_potions[1].name).toBe('Essence of Eternal Vitality')
    })


})