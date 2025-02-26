import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import type { FindByCityPetServiceInput } from '../../services/pet/find-by-city-pet.service'
import { makeFindByCityPet } from '../../factories/make-find-by-city-pet'

export async function findByCityPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = request.query

  const findByCityPetSchema = z.object({
    city: z.string(),
  })

  await findByCityPetSchema.parse(query)

  const data = request.query as FindByCityPetServiceInput

  const findByCityPetService = makeFindByCityPet()

  const { pets } = await findByCityPetService.execute(data)

  reply.status(201).send({
    pets,
  })
}
