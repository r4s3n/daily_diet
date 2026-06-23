import { Meal } from "../../generated/prisma/client.js";

export interface RegisterMealRequest {
    name: string;
    description: string;
    isOnDiet: boolean;
}

export interface RegisterMealResponse {
    meal: Meal
}