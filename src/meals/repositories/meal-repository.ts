import { Meal } from "../../generated/prisma/client.js";
import { EditMealRequest } from "../dto/edit-meal.dto.js";
import { RegisterMealRequest } from "../dto/register-meal.dto.js";

export interface MealRepository{
    findById(mealId: string): Promise<Meal | null>

    create(meal: RegisterMealRequest, userId: string): Promise<Meal>
    edit(meal: EditMealRequest, mealId: string): Promise<Meal>
    delete(mealId: string): Promise<void>
    list(userId: string): Promise<Meal[]>

    totalMeals(userId: string): Promise<number>
    totalMealsInDiet(userId: string): Promise<number>
    totalMealsOutOfDiet(userId: string): Promise<number>
    sequenceOfMealsInDiet(userId: string): Promise<Meal[]>
}