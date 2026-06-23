import { User } from "../../generated/prisma/client.js"

export interface AutenticateUserRequest{
    email: string
    password: string
}

export interface AuthenticateUserResponse{
    user: User
}