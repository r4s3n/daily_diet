import { DeleteMealRequest, DeleteMealResponse } from "../dto/remove-meal.dto.js";
import { MealNotFound } from "../errors/meal-not-found-error.js";
import { NotAuthorizedFound } from "../errors/not-authorized-error.js";
import { MealRepository } from "../repositories/meal-repository.js";

export class RemoveMealService {
    constructor(
        private mealRepository: MealRepository,
    ){}

    async execute({ mealId }: DeleteMealRequest, userId: string): Promise<DeleteMealResponse>{

        const findMeal = await this.mealRepository.findById(mealId)

        if(!findMeal){
            throw new MealNotFound()
        }

        if(findMeal.userId !== userId){
            throw new NotAuthorizedFound()
        }

        await this.mealRepository.delete(findMeal.id)

        return {}
    }
}