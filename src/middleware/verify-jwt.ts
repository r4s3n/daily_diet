import { FastifyRequest, FastifyReply } from "fastify";

export async function verifyJwt(req: FastifyRequest, res: FastifyReply) {
    try {
        await req.jwtVerify()

    } catch (error: any) {
        return res.status(401).send({message: 'Unauthorized'})
    }   
}