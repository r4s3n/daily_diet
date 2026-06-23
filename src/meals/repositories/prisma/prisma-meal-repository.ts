import { Meal } from "../../../generated/prisma/client.js";
import { prisma } from "../../../lib/prisma.js";
import { EditMealRequest } from "../../dto/edit-meal.dto.js";
import { RegisterMealRequest } from "../../dto/register-meal.dto.js";
import { MealRepository } from "../meal-repository.js";

export class PrismaMealRepository implements MealRepository {
    async findById(mealId: string): Promise<Meal | null> {
        const meal = await prisma.meal.findUnique({
            where: {
                id: mealId
            }
        })

        return meal ?? null
    }

    async create(meal: RegisterMealRequest, userId: string): Promise<Meal> {
        const newMeal = await prisma.meal.create({
            data:{
                name: meal.name,
                description: meal.description,
                isOnDiet: meal.isOnDiet,
                userId: userId
            }
        })

        return newMeal
    }

    async edit(meal: EditMealRequest, mealId: string): Promise<Meal> {
        const updatedMeal = await prisma.meal.update({
            where: {
                id: mealId
            },
            data: {
                name: meal.name,
                description: meal.description,
                isOnDiet: meal.isOnDiet
            }
        })

        return updatedMeal
    }

    async delete(mealId: string): Promise<void> {
        await prisma.meal.delete({
            where:{
                id: mealId
            }
        })
    }

    async list(userId: string): Promise<Meal[]> {
        const meals = await prisma.meal.findMany({
            where: {
                userId: userId
            }
        })

        return meals
    }

    async totalMeals(userId: string): Promise<number> {
        const total = await prisma.meal.count({
            where: {
                userId: userId
            }
        })

        return total
    }

    async totalMealsInDiet(userId: string): Promise<number> {
       const total = await prisma.meal.count({
            where: {
                userId: userId,
                isOnDiet: true
            }
        })
        return total
    }

    async totalMealsOutOfDiet(userId: string): Promise<number> {
        const total = await prisma.meal.count({
            where: {
                userId: userId,
                isOnDiet: false
            }
        })

        return total
    }

    async sequenceOfMealsInDiet(userId: string): Promise<Meal[]> {
        const meals = await prisma.meal.findMany({
            where: {
                userId: userId,
                isOnDiet: true
            }
        })
        return meals
    }
}