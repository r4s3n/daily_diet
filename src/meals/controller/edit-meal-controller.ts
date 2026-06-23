import { FastifyReply, FastifyRequest } from "fastify";
import { MakeEditMealService } from "../factories/make-edit-meal";
import { EditMealSchema } from "../schema/edit-meal.schema";
import { MealIdSchema } from "../schema/meal-id.schema";

export async function EditMealController(req: FastifyRequest, res: FastifyReply) {
    const data = EditMealSchema.parse(req.body)
    const {mealId} = MealIdSchema.parse(req.params)

    try {
        const editMealService = MakeEditMealService()

        const service = await editMealService.execute(data, mealId, req.user.sub)

        res.status(200).send(service)

    } catch (error: any) {
        if(error instanceof Error){
            res.status(400).send({
                error: error.message
            })

        }
    }
}