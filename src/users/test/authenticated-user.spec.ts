import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryUserRepository } from './in-memory/in-memory-user-repository'
import { AuthenticateUserService } from '../service/authenticate-user-service'
import { EmailOrIncorrect } from '../errors/email-or-incorrect-error'
import { hash } from 'bcrypt'

let usersRepository: InMemoryUserRepository
let sut: AuthenticateUserService

describe('Authenticate Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository()
        sut = new AuthenticateUserService(usersRepository)
    })

    it('should be able to authenticate', async () => {
    
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: (await hash('123456', 6)).toString()
        })

        const {user} = await sut.execute({
            email: 'johndoe@test.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))    
    })

    it('should not be able to authenticate with incorrect email', async () => {

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456'
        })

        // sempre que eu for fazer o expect e tiver um promise dentro dele, tenho que add um await no inicio
        await expect(() => 
            sut.execute({
                email: 'johndoe@test.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(EmailOrIncorrect) // espero que rejeite o registro com a mesmo email
    })
})