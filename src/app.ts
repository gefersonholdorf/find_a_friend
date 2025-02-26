import fastify from 'fastify'
import { env } from './env'

export const app = fastify()

console.log(env.SECRET_KEY)
