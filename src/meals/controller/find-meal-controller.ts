import { FastifyReply, FastifyRequest } from "fastify";
import { MealIdSchema } from "../schema/meal-id.schema";
import { MakeFindMealService } from "../factories/make-find-meal";
import { MealNotFound } from "../errors/meal-not-found-error";
import { NotAuthorizedFound } from "../errors/not-authorized-error";

export async function FindMealController(req: FastifyRequest, res: FastifyReply) {
    const {mealId} = MealIdSchema.parse(req.params)

    try {
        const findMealService = MakeFindMealService()

        const service = await findMealService.execute({mealId}, req.user.sub)

        res.status(200).send(service)

    } catch (error: any) {
        if(error instanceof MealNotFound || error instanceof NotAuthorizedFound ){
            res.status(400).send({
                error: error.message
            })

        }
    }
}