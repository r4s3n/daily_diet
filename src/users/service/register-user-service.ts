import { RegisterUserRequest, RegisterUserResponse } from "../dto/register.dto.js";
import { UserAlreadyExists } from "../errors/user-already-exists-error.js";
import { UserRepository } from "../repositories/user-repository.js";
import {hash} from "bcrypt"

export class RegisterUserService{
    constructor(
        private userRepository: UserRepository
    ){}

    async execute (data: RegisterUserRequest): Promise<RegisterUserResponse>{
        const userAlreadyExists = await this.userRepository.findByEmail(data.email)

        if(userAlreadyExists){
            throw new UserAlreadyExists()
        }


        const passwordHash = await hash(data.password, 6)


        const user = await this.userRepository.create({
            ...data,
            password: passwordHash
        })

        
        return user
        
    }
}