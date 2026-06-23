import { PrismaMealRepository } from "../repositories/prisma/prisma-meal-repository"
import { ListMealService } from "../service/list-meal-service"

export function MakeListMealService(){
    const prismaUserRepository = new PrismaMealRepository
    const service = new ListMealService(prismaUserRepository)

    return service
}