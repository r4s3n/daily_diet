import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryMealRepository } from './in-memory/in-memory-meal-repository'
import { RegisterMealService } from '../service/register-meal-service'
import { EditMealService } from '../service/edit-meal-service'
import { MealNotFound } from '../errors/meal-not-found-error'
import { NotAuthorizedFound } from '../errors/not-authorized-error'


let mealRepository: InMemoryMealRepository
let sut: EditMealService

describe('Edit meal Use Case', () => {

    beforeEach(() => {
        mealRepository = new InMemoryMealRepository()
        sut = new EditMealService(mealRepository)
    })

    it('should be able to edit meal', async () => {
    
        const createMeal = await mealRepository.create({
            name: 'Macarrão',
            description: 'Macarrão com queijo e frango grelhado',
            isOnDiet: true
        }, '1')

        const {meal} = await sut.execute({
            name: 'Macarrão com queijo'
        }, createMeal.id, '1')

        expect(meal.name).toEqual('Macarrão com queijo')       
    })

    it('should be not able to edit meal if mealId incorrect', async () => {
    
        await mealRepository.create({
            name: 'Macarrão',
            description: 'Macarrão com queijo e frango grelhado',
            isOnDiet: true
        }, '1')

        await expect(() => sut.execute({
            name: 'Macarrão com queijo'
        }, '1', '1')).rejects.toBeInstanceOf(MealNotFound)
               
    })

    it('should be not able to edit meal if other userId', async () => {
    
        const createMeal = await mealRepository.create({
            name: 'Macarrão',
            description: 'Macarrão com queijo e frango grelhado',
            isOnDiet: true
        }, '1')

        await expect(() => sut.execute({
            name: 'Macarrão com queijo'
        }, createMeal.id, '2')).rejects.toBeInstanceOf(NotAuthorizedFound)

               
    })
})