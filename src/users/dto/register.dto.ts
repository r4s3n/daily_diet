import { User } from "../../generated/prisma/client.js"

export interface RegisterUserRequest{
    name: string
    email: string
    password: string
}

export interface RegisterUserResponse{
    id: string
    name: string
    email: string
    createdAt: Date
}
