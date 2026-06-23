import { PrismaMealRepository } from "../repositories/prisma/prisma-meal-repository"
import { FindMealService } from "../service/find-meal-service"

export function MakeFindMealService(){
    const prismaUserRepository = new PrismaMealRepository
    const service = new FindMealService(prismaUserRepository)

    return service
}