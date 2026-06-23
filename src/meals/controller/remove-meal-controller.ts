import { FastifyReply, FastifyRequest } from "fastify";
import { MealIdSchema } from "../schema/meal-id.schema";
import { MakeRemoveMealService } from "../factories/make-remove-meal";
import { NotAuthorizedFound } from "../errors/not-authorized-error";
import { MealNotFound } from "../errors/meal-not-found-error";

export async function RemoveMealController(req: FastifyRequest, res: FastifyReply) {
    const {mealId} = MealIdSchema.parse(req.params)

    try {
        const removeMealService = MakeRemoveMealService()

        const service = await removeMealService.execute({mealId}, req.user.sub)

        res.status(200).send(service)

    } catch (error: any) {
        if(error instanceof MealNotFound || error instanceof NotAuthorizedFound){
            res.status(400).send({
                error: error.message
            })

        }
    }
}