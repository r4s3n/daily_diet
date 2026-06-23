import { PrismaMealRepository } from "../repositories/prisma/prisma-meal-repository"
import { RemoveMealService } from "../service/delete-meal-service"

export function MakeRemoveMealService(){
    const prismaUserRepository = new PrismaMealRepository
    const service = new RemoveMealService(prismaUserRepository)

    return service
}