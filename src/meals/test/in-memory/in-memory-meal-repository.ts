import { randomUUID } from "node:crypto";
import { Meal } from "../../../generated/prisma/client";
import { EditMealRequest } from "../../dto/edit-meal.dto";
import { RegisterMealRequest } from "../../dto/register-meal.dto";
import { MealRepository } from "../../repositories/meal-repository";

export class InMemoryMealRepository implements MealRepository{
    public meals: Meal[] = []

    async findById(mealId: string){
        return this.meals.find((item) => item.id === mealId) ?? null
    }

    async create(meal: RegisterMealRequest, userId: string): Promise<Meal> {
        const createMeal = {
            ...meal,
            userId: userId,
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.meals.push(createMeal)

        return createMeal
    }

    async edit(meal: EditMealRequest, mealId: string){
        const index = this.meals.findIndex((item) => item.id === mealId)
        const mealIndex = this.meals[index]

        this.meals[index] = {
            ...mealIndex,
            ...meal
        }

        return this.meals[index]
    }

    async delete(mealId: string){
        const index = this.meals.findIndex((item) => item.id === mealId)
    
        this.meals.slice(index, 1)
    }

    async list(userId: string){
        const mealList = this.meals.filter((item) => item.userId === userId)

        return mealList
    }

    async totalMeals(userId: string) {
         const mealList = this.meals.filter((item) => item.userId === userId).length

         return mealList
    }

    async totalMealsInDiet(userId: string): Promise<number> {
        const mealList = this.meals.filter((item) => item.userId === userId && item.isOnDiet === true).length

        return mealList
    }

    async totalMealsOutOfDiet(userId: string): Promise<number> {
        const mealList = this.meals.filter((item) => item.userId === userId && item.isOnDiet === false).length

        return mealList
    }

    async sequenceOfMealsInDiet(userId: string): Promise<Meal[]> {
        return this.meals.filter((item) => item.userId === userId)
    }
}