import { EditMealRequest, EditMealResponse } from "../dto/edit-meal.dto.js";
import { MetricsMealRequest, MetricsMealResponse } from "../dto/metrics-meal.dto.js";
import { MealRepository } from "../repositories/meal-repository.js";

export class MetricsMealService {
    constructor(
        private mealRepository: MealRepository,
    ){}

    async execute({ userId }: MetricsMealRequest): Promise<MetricsMealResponse>{

        const totalMeals = await this.mealRepository.totalMeals(userId)
        const mealsInDiet = await this.mealRepository.totalMealsInDiet(userId)
        const mealsOutDiet = await this.mealRepository.totalMealsOutOfDiet(userId)
        const sequenceOfMealsInDiet = await this.mealRepository.sequenceOfMealsInDiet(userId)

        let bestSequenceOfMealsInDiet = 0
        let currentSequence = 0

        for (const meal of sequenceOfMealsInDiet){
            if(meal.isOnDiet){
                currentSequence++

                if(currentSequence > bestSequenceOfMealsInDiet){
                    bestSequenceOfMealsInDiet = currentSequence
                }
            } else {
                currentSequence = 0
            }
        }

        return {
            totalMeals,
            mealsInDiet,
            mealsOutDiet,
            bestSequenceOfMealsInDiet
        }
    }
}