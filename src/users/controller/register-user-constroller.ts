import {FastifyRequest , FastifyReply } from "fastify";
import { MakeRegisterService } from "../factories/make-register-service.js";
import { RegisterSchema } from "../schema/register-user.schema.js";

export async function RegisterUserController(req: FastifyRequest, res: FastifyReply) {
    const data = RegisterSchema.parse(req.body)

    try {
        const RegisterService = MakeRegisterService()
        const user = await RegisterService.execute(data)

        return res.status(201).send(user)
        
    } catch (error: any) {
        if(error instanceof Error){
            res.status(400).send({
                error: error.message
            })
        }
    }
}