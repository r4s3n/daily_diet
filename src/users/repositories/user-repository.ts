import { User } from "../../generated/prisma/client.js";
import { RegisterUserRequest, RegisterUserResponse } from "../dto/register.dto.js";

export interface UserRepository{
    findByEmail(email: string): Promise<User | null>
    create(data: RegisterUserRequest): Promise<RegisterUserResponse>
}