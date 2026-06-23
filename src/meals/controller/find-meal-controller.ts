import { FastifyReply, FastifyRequest } from "fastify";
import { MealIdSchema } from "../schema/meal-id.schema";
import { MakeFindMealService } from "../factories/make-find-meal";

export async function FindMealController(req: FastifyRequest, res: FastifyReply) {
    const {mealId} = MealIdSchema.parse(req.params)

    try {
        const findMealService = MakeFindMealService()

        const service = await findMealService.execute({mealId}, req.user.sub)

        res.status(200).send(service)

    } catch (error: any) {
        if(error instanceof Error){
            res.status(400).send({
                error: error.message
            })

        }
    }
}