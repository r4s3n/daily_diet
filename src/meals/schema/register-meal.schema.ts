import {z} from 'zod'

export const RegisterMealSchema = z.object({
    name: z.string(),
    description: z.string(),
    isOnDiet: z.boolean()
})