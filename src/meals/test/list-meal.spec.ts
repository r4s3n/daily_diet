import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryMealRepository } from './in-memory/in-memory-meal-repository'
import { ListMealService } from '../service/list-meal-service'


let mealRepository: InMemoryMealRepository
let sut: ListMealService

describe('list meals Use Case', () => {

    beforeEach(() => {
        mealRepository = new InMemoryMealRepository()
        sut = new ListMealService(mealRepository)
    })

    it('should be able to list meals', async () => {
    
        await mealRepository.create({
            name: 'Macarrão1',
            description: 'Macarrão com queijo e frango grelhado',
            isOnDiet: true
        }, '1')

        await mealRepository.create({
            name: 'Macarrão2',
            description: 'Macarrão com queijo e frango grelhado',
            isOnDiet: true
        }, '1')

        await mealRepository.create({
            name: 'Macarrão3',
            description: 'Macarrão com queijo e frango grelhado',
            isOnDiet: true
        }, '1')

        const {meals} = await sut.execute({userId: '1'})

        expect(meals).toHaveLength(3)      
    })

})