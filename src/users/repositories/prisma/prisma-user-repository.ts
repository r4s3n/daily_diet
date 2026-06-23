import { User } from "../../../generated/prisma/client.js";
import { prisma } from "../../../lib/prisma.js";
import { RegisterUserRequest, RegisterUserResponse } from "../../dto/register.dto.js";
import { UserRepository } from "../user-repository.js";


export class PrismaUserRepository implements UserRepository{
    async findByEmail(email: string): Promise<User | null> {
       const user = await prisma.user.findUnique({
            where: {
                email: email
            }
       })

        return user ?? null
    }

    async create(data: RegisterUserRequest): Promise<RegisterUserResponse> {
        const user = await prisma.user.create({
            data: data,
            select:{
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        })

        return user
    }
}