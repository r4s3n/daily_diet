import { Meal } from "../../generated/prisma/client.js";

export interface DeleteMealRequest {
    mealId: string;
}

export interface DeleteMealResponse {}