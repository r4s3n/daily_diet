import { FastifyInstance } from "fastify";
import { RegisterUserController } from "./controller/register-user-constroller.js";
import { AuthenticateUserController } from "./controller/authenticate-user-controller.js";

export async function AppUserRoutes(app: FastifyInstance) {
    app.post('/users/register', RegisterUserController)
    app.post('/users/login', AuthenticateUserController)
}