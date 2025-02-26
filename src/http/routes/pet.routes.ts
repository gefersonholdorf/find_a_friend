import type { FastifyInstance } from 'fastify'
import { createPetController } from '../controllers/pet/create-pet.controller'
import { findByIdPetController } from '../controllers/pet/find-by-id-pet.controller'
import { findAllPetController } from '../controllers/pet/find-all-pet.controller'

export function petRoutes(app: FastifyInstance) {
  app.post('/pets', createPetController)
  app.get('/pets/:id', findByIdPetController)
  app.get('/pets', findAllPetController)
}
