import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "../env/index.js";

export const schema =
  new URL(env.DATABASE_URL).searchParams.get('schema') || 'public'

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL },{schema});
const prisma = new PrismaClient({
    adapter,
    log: env.NODE_ENV === 'dev' ? ['query'] : [],
    
});

export { prisma };