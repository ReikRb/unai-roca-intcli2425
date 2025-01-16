import { Ingredient } from "../types/Ingredient";
import { Potion } from "../types/Potion";
import { SecondaryEffect } from "../types/SecondaryEffect";

export function filterByLevelRequirement(potions: Potion[], level: number):Potion[] {
    return potions.filter((potion: Potion) => potion.usage.restrictions.levelRequirement <= level)
}

export function getPotionsByRarity(potions: Potion[], rarity: string):Potion[] {
    return potions.filter((potion: Potion) => potion.rarity === rarity)
}

export function listIngredients(potion: Potion): string[] {
    return potion.ingredients.map((ingredient: Ingredient) => ingredient.name)
}

export function findPotionByEffect(potions: Potion[], effectName: string): Potion[] {
    return potions.filter((potion: Potion) =>
        potion.effects.secondary.some((effect: SecondaryEffect) => effect.attribute === effectName)
    )
}

export function calculateCraftingTime(potions: Potion[]): number {
    let craftingTime: number = 0
    potions.map((potion: Potion) => {
        const unit: string = potion.crafting.time.unit
        const amount: number = potion.crafting.time.amount

        unit === 'hours' ? craftingTime += amount * 60 
                         : craftingTime += amount
    })

    console.log('TOTAL TIME TO CRAFT ALL POTIONS: ', craftingTime)
    return craftingTime
}