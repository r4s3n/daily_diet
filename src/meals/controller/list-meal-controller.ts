import { FastifyReply, FastifyRequest } from "fastify";
import { MakeListMealService } from "../factories/make-list-meal";

export async function ListMealController(req: FastifyRequest, res: FastifyReply) {

    try {
        const listMealService = MakeListMealService()

        const service = await listMealService.execute({userId: req.user.sub})

        res.status(200).send(service)

    } catch (error: any) {
        if(error instanceof Error){
            res.status(400).send({
                error: error.message
            })

        }
    }
}