import { Potion } from "../types/Potion";

export function filterByLevelRequirement(potions:Potion[], level: number){
    let newPotions: Potion[] = []
    potions.map((potion: Potion)=> {
        potion.usage.restrictions.levelRequirement <= level ? newPotions = [...newPotions, potion] : null 
    }) 
    return newPotions
}

export function getPotionsByRarity(potions: Potion[], rarity: string){
    let newPotions: Potion[] = []
    potions.map((potion: Potion)=> {
        potion.rarity === rarity ? newPotions = [...newPotions, potion] : null 
    }) 
    return newPotions
}

