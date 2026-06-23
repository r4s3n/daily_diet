import { PrismaMealRepository } from "../repositories/prisma/prisma-meal-repository"
import { MetricsMealService } from "../service/metrics-meal-service"

export function MakeMetricsMealService(){
    const prismaUserRepository = new PrismaMealRepository
    const service = new MetricsMealService(prismaUserRepository)

    return service
}