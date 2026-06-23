import {z} from 'zod'

export const RegisterSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.coerce.string()
})