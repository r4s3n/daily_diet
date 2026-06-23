import { PrismaMealRepository } from "../repositories/prisma/prisma-meal-repository"
import { EditMealService } from "../service/edit-meal-service"

export function MakeEditMealService(){
    const prismaUserRepository = new PrismaMealRepository
    const service = new EditMealService(prismaUserRepository)

    return service
}