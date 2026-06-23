import {z} from 'zod'

export const MealIdSchema = z.object({
    mealId: z.string()
})
