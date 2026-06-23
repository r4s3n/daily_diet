import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryMealRepository } from './in-memory/in-memory-meal-repository'
import { FindMealService } from '../service/find-meal-service'
import { MealNotFound } from '../errors/meal-not-found-error'
import { NotAuthorizedFound } from '../errors/not-authorized-error'
import { RemoveMealService } from '../service/remove-meal-service'


let mealRepository: InMemoryMealRepository
let sut: RemoveMealService

describe('Remove meal Use Case', () => {

    beforeEach(() => {
        mealRepository = new InMemoryMealRepository()
        sut = new RemoveMealService(mealRepository)
    })

    it('should be able to remove meal', async () => {
    
       const create =  await mealRepository.create({
            name: 'Macarrão1',
            description: 'Macarrão com queijo e frango grelhado',
            isOnDiet: true
        }, '1')


        await sut.execute({mealId: create.id}, '1')

        expect(mealRepository.meals).toHaveLength(1)
    })

    it('should be able to remove meal with mealId incorrect', async () => {
    
        await mealRepository.create({
            name: 'Macarrão',
            description: 'Macarrão com queijo e frango grelhado',
            isOnDiet: true
        }, '1')

        await expect(() => sut.execute({mealId: '1'}, '1'))
        .rejects.toBeInstanceOf(MealNotFound)
    })
    
    it('should be able to remove meal with other userId', async () => {
    
        const create = await mealRepository.create({
            name: 'Macarrão',
            description: 'Macarrão com queijo e frango grelhado',
            isOnDiet: true
        }, '1')

        await expect(() => sut.execute({mealId: create.id}, '2'))
        .rejects.toBeInstanceOf(NotAuthorizedFound)
    })

})