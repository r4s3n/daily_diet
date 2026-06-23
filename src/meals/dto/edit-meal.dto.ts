import { Meal } from "../../generated/prisma/client.js";

export interface EditMealRequest {
    name?: string;
    description?: string;
    isOnDiet?: boolean;
}

export interface EditMealResponse {
    meal: Meal
}