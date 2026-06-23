import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository.js";
import { AuthenticateUserService } from "../service/authenticate-user-service.js";

export function MakeAuthenticateService(){
    const prismaUserRepository = new PrismaUserRepository
    const service = new AuthenticateUserService(prismaUserRepository)

    return service
}