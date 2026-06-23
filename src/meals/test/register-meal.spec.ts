import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryMealRepository } from './in-memory/in-memory-meal-repository'
import { RegisterMealService } from '../service/register-meal-service'


let mealRepository: InMemoryMealRepository
let sut: RegisterMealService

describe('Register meal Use Case', () => {

    beforeEach(() => {
        mealRepository = new InMemoryMealRepository()
        sut = new RegisterMealService(mealRepository)
    })

    it('should be able to register meal', async () => {
    
        const {meal} = await sut.execute({
            name: 'Macarrão',
            description: 'Macarrão com queijo e frango grelhado',
            isOnDiet: true
        }, '1')

        expect(meal.id).toEqual(expect.any(String))
        expect(mealRepository.meals[0].name).toEqual('Macarrão')        
    })
})