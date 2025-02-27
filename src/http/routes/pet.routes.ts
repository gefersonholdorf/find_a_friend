import type { FastifyInstance } from 'fastify'
import { createPetController } from '../controllers/pet/create-pet.controller'
import { findByIdPetController } from '../controllers/pet/find-by-id-pet.controller'
import { findAllPetController } from '../controllers/pet/find-all-pet.controller'
import { verifyTokenMiddleware } from '../middlewares/verify-token.middleware'

export function petRoutes(app: FastifyInstance) {
  app.post('/pets', { preHandler: verifyTokenMiddleware }, createPetController)
  app.get('/pets/:id', findByIdPetController)
  app.get('/pets', findAllPetController)
}
