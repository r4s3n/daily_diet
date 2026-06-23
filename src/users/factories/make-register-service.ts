import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository.js";
import { RegisterUserService } from "../service/register-user-service.js";

export function MakeRegisterService(){
    const prismaUserRepository = new PrismaUserRepository
    const service = new RegisterUserService(prismaUserRepository)

    return service
}