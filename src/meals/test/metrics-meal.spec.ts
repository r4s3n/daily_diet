import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryMealRepository } from './in-memory/in-memory-meal-repository'
import { RemoveMealService } from '../service/remove-meal-service'
import { MetricsMealService } from '../service/metrics-meal-service'


let mealRepository: InMemoryMealRepository
let sut: MetricsMealService

describe('Metrics meal Use Case', () => {

    beforeEach(() => {
        mealRepository = new InMemoryMealRepository()
        sut = new MetricsMealService(mealRepository)
    })

    it('should be able to get total Meals', async () => {
        
        for (let index = 1; index < 22 ; index++) {
            await mealRepository.create({
                name: `Macarrão ${index}`,
                description: 'Macarrão com queijo e frango grelhado',
                isOnDiet: index <= 15 ? true : false
            }, '1')
            
        }

        const {totalMeals, mealsInDiet, mealsOutDiet, bestSequenceOfMealsInDiet} = await sut.execute({userId: '1'})

        expect(totalMeals).toEqual(21)
        expect(mealsInDiet).toEqual(15)
        expect(mealsOutDiet).toEqual(6)
        expect(bestSequenceOfMealsInDiet).toEqual(15)
    })

})