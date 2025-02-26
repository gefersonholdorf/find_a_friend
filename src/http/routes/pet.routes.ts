import type { FastifyInstance } from 'fastify'
import { createPetController } from '../controllers/pet/create-pet.controller'
import { findByIdPetController } from '../controllers/pet/find-by-id-pet.controller'
import { FindByCityPetService } from '../services/pet/find-by-city-pet.service'
import { findByCityPetController } from '../controllers/pet/find-by-city-pet.controller'

export function petRoutes(app: FastifyInstance) {
  app.post('/pets', createPetController)
  app.get('/pets/:id', findByIdPetController)
  app.get('/pets', findByCityPetController)
}
