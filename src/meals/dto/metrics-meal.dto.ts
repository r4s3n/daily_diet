export interface MetricsMealRequest {
    userId: string;
}

export interface MetricsMealResponse {
    totalMeals: number;
    mealsInDiet: number;
    mealsOutDiet: number;
    bestSequenceOfMealsInDiet: number;
}