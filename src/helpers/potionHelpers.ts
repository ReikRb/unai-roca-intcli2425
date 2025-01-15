import { Ingredient } from "../types/Ingredient";
import { Potion } from "../types/Potion";
import { SecondaryEffect } from "../types/SecondaryEffect";

export function filterByLevelRequirement(potions: Potion[], level: number) {
    let newPotions: Potion[] = []
    potions.map((potion: Potion) => {
        potion.usage.restrictions.levelRequirement <= level ? newPotions = [...newPotions, potion] : null
    })
    return newPotions
}

export function getPotionsByRarity(potions: Potion[], rarity: string) {
    let newPotions: Potion[] = []
    potions.map((potion: Potion) => {
        potion.rarity === rarity ? newPotions = [...newPotions, potion] : null
    })
    return newPotions
}

export function listIngredients(potion: Potion) {
    let ingredients: string[] = []
    potion.ingredients.map((ingredient: Ingredient) => {
        ingredients = [...ingredients, ingredient.name]
    })
    return ingredients
}

export function findPotionByEffect(potions: Potion[], effectName: string) {
    let newPotions: Potion[] = []
    potions.map((potion: Potion) => {
        potion.effects.secondary.map((effect: SecondaryEffect) => {
            effect.attribute === effectName ? newPotions = [...newPotions, potion] : null
        })
    })
    return newPotions
}