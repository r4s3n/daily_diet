import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterMealSchema } from "../schema/register-meal.schema";
import { MakeRegisterMealService } from "../factories/make-register-meal";

export async function RegisterMealController(req: FastifyRequest, res: FastifyReply) {
    const data = RegisterMealSchema.parse(req.body)

    try {
        const registerMealService = MakeRegisterMealService()

        const service = await registerMealService.execute(data, req.user.sub)

        res.status(201).send(service)

    } catch (error: any) {
        if(error instanceof Error){
            res.status(400).send({
                error: error.message
            })

        }
    }
}