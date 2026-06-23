import { compare } from "bcrypt";
import { AutenticateUserRequest, AuthenticateUserResponse } from "../dto/authenticate.dto.js";
import { UserRepository } from "../repositories/user-repository.js";
import { EmailOrIncorrect } from "../errors/email-or-incorrect-error.js";

export class AuthenticateUserService{
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(data: AutenticateUserRequest): Promise<AuthenticateUserResponse>{
        const user = await this.userRepository.findByEmail(data.email)

        if(!user){
            throw new Error('Email or password incorrect')
        }

        const comparePassword = await compare(data.password, user.password)

        if(!comparePassword){
            throw new EmailOrIncorrect()
        }
        
        return {
            user
        }

    }
}