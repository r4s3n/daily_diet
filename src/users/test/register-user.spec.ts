import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryUserRepository } from './in-memory/in-memory-user-repository'
import { RegisterUserService } from '../service/register-user-service'
import { compare } from 'bcrypt'
import { UserAlreadyExists } from '../errors/user-already-exists-error'

let usersRepository: InMemoryUserRepository
let sut: RegisterUserService

describe('Register Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository()
        sut = new RegisterUserService(usersRepository)
    })

    it('should be able to register', async () => {
    
        const {id} = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456'
        })

        expect(id).toEqual(expect.any(String))
        expect(usersRepository.users[0].name).toEqual('John Doe')        
    })

    it('should not be able to register with same email twice', async () => {
    

        const email = 'johndoe@test.com'

        await sut.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })

        // sempre que eu for fazer o expect e tiver um promise dentro dele, tenho que add um await no inicio
        await expect(() => 
            sut.execute({
                name: 'John Doe',
                email,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExists) // espero que rejeite o registro com a mesmo email
    })
})