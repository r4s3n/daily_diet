import { FindMealRequest, FindMealResponse } from "../dto/find-meal.dto.js";
import { MealNotFound } from "../errors/meal-not-found-error.js";
import { NotAuthorizedFound } from "../errors/not-authorized-error.js";
import { MealRepository } from "../repositories/meal-repository.js";

export class FindMealService {
    constructor(
        private mealRepository: MealRepository,
    ){}

    async execute(data: FindMealRequest, userId: string): Promise<FindMealResponse>{
        const meal = await this.mealRepository.findById(data.mealId)

        if(!meal){
            throw new MealNotFound()
        }

        if(meal.userId !== userId){
            throw new NotAuthorizedFound()
        }

        return {
            meal
        }
    }
}