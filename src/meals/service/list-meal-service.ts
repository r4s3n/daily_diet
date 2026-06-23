import { ListMealRequest, ListMealResponse } from "../dto/list-meal.dto.js";
import { MealRepository } from "../repositories/meal-repository.js";

export class ListMealService {
    constructor(
        private mealRepository: MealRepository,
    ){}

    async execute(data: ListMealRequest): Promise<ListMealResponse>{
        const meals = await this.mealRepository.list(data.userId)

        return {
            meals
        }
    }
}