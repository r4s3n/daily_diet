import {z} from 'zod'

export const EditMealSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isOnDiet: z.boolean().optional()
})
