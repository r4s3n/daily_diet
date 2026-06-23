import {FastifyRequest , FastifyReply } from "fastify";
import { AuthenticateSchema } from "../schema/authenticate-user.schema.js";
import { MakeAuthenticateService } from "../factories/make-authenticate-service.js";
import { EmailOrIncorrect } from "../errors/email-or-incorrect-error.js";

export async function AuthenticateUserController(req: FastifyRequest, res: FastifyReply) {
    const {email, password} = AuthenticateSchema.parse(req.body)

    try {
        const authenticateService = MakeAuthenticateService()
        const {user} = await authenticateService.execute({email, password})

        const token = await res.jwtSign({}, {
            sign:{
                sub: user.id
            }
        })

        return res.status(200).send({
            token
        })
        
    } catch (error: any) {
        if(error instanceof EmailOrIncorrect){
            res.status(401).send({
                error: error.message
            })
        }
    }
}