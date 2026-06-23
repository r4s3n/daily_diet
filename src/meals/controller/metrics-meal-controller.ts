import { FastifyReply, FastifyRequest } from "fastify";
import { MakeMetricsMealService } from "../factories/make-metrics-meal";

export async function MetricsMealController(req: FastifyRequest, res: FastifyReply) {

    try {
        const metricsMealService = MakeMetricsMealService()

        const service = await metricsMealService.execute({userId: req.user.sub})

        res.status(200).send(service)

    } catch (error: any) {
        if(error instanceof Error){
            res.status(400).send({
                error: error.message
            })

        }
    }
}