import { Meal } from "../../generated/prisma/client.js";

export interface FindMealRequest {
    mealId: string
}

export interface FindMealResponse {
    meal: Meal
}