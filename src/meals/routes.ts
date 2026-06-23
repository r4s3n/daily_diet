import { FastifyInstance } from "fastify";
import { verifyJwt } from '../middleware/verify-jwt'
import { RegisterMealController } from "./controller/register-meal-controller";
import { RemoveMealController } from "./controller/remove-meal-controller";
import { ListMealController } from "./controller/list-meal-controller";
import { EditMealController } from "./controller/edit-meal-controller";
import { FindMealController } from "./controller/find-meal-controller";
import { MetricsMealController } from "./controller/metrics-meal-controller";

export async function AppMealRoutes(app: FastifyInstance) {
    app.post('/meal/add',{onRequest: [verifyJwt]}, RegisterMealController)
    app.get('/meal',{onRequest: [verifyJwt]}, ListMealController)
    app.delete('/meal/:mealId/delete',{onRequest: [verifyJwt]}, RemoveMealController)
    app.patch('/meal/:mealId/edit',{onRequest: [verifyJwt]}, EditMealController)
    app.get('/meal/:mealId',{onRequest: [verifyJwt]}, FindMealController)
    app.get('/meal/metrics',{onRequest: [verifyJwt]}, MetricsMealController)

    
}