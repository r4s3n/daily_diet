import { EditMealRequest, EditMealResponse } from "../dto/edit-meal.dto.js";
import { MealNotFound } from "../errors/meal-not-found-error.js";
import { NotAuthorizedFound } from "../errors/not-authorized-error.js";
import { MealRepository } from "../repositories/meal-repository.js";

export class EditMealService {
    constructor(
        private mealRepository: MealRepository,
    ){}

    async execute(data: EditMealRequest, mealId: string, userId: string): Promise<EditMealResponse>{

        const findMeal = await this.mealRepository.findById(mealId)

        if(!findMeal){
            throw new MealNotFound()
        }

        if(findMeal.userId !== userId){
            throw new NotAuthorizedFound()
        }

        const meal = await this.mealRepository.edit(data, findMeal.id)

        return {
            meal
        }
    }
}