import { Meal } from "../../generated/prisma/client.js";

export interface ListMealRequest {
    userId: string
}

export interface ListMealResponse {
    meals: Meal[]
}