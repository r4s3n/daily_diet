import { PrismaMealRepository } from "../repositories/prisma/prisma-meal-repository"
import { RegisterMealService } from "../service/register-meal-service"

export function MakeRegisterMealService(){
    const prismaUserRepository = new PrismaMealRepository
    const service = new RegisterMealService(prismaUserRepository)

    return service
}