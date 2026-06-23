import { RegisterMealRequest, RegisterMealResponse } from "../dto/register-meal.dto.js";
import { MealRepository } from "../repositories/meal-repository.js";

export class RegisterMealService {
    constructor(
        private mealRepository: MealRepository,
    ){}

    async execute(data: RegisterMealRequest, userId: string): Promise<RegisterMealResponse>{
        const meal = await this.mealRepository.create(data, userId)

        return {
            meal
        }
    }
}