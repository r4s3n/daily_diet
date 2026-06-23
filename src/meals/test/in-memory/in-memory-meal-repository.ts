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

        return mealIndex
    }

    async delete(mealId: string){
        const index = this.meals.findIndex((item) => item.id === mealId)
    
        this.meals.slice(index, 1)
    }

    async list(userId: string){
        const mealList = this.meals.filter((item) => item.userId === userId)

        return mealList
    }

    async totalMeals(userId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async totalMealsInDiet(userId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async totalMealsOutOfDiet(userId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async sequenceOfMealsInDiet(userId: string): Promise<Meal[]> {
        throw new Error("Method not implemented.");
    }
}