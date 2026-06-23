import { randomUUID } from "node:crypto";
import { User } from "../../../generated/prisma/client";
import { RegisterUserRequest, RegisterUserResponse } from "../../dto/register.dto";
import { UserRepository } from "../../repositories/user-repository";

export class InMemoryUserRepository implements UserRepository{
    public users: User[] = []

    async findByEmail(email: string){
        return this.users.find((item) => item.email === email) ?? null
    }

    async create(data: RegisterUserRequest): Promise<RegisterUserResponse>{
        const user = {
            ...data,
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.users.push(user)

        return user
    }
}