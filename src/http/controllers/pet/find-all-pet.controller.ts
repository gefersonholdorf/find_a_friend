import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import type { FindByCityPetServiceInput } from '../../services/pet/find-by-city-pet.service'
import { makeFindAllPet } from '../../factories/make-find-all-pet'

export async function findAllPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = request.query

  const findByCityPetSchema = z.object({
    city: z.string(),
  })

  await findByCityPetSchema.parse(query)

  const data = request.query as FindByCityPetServiceInput

  const findByCityPetService = makeFindAllPet()

  const { pets } = await findByCityPetService.execute(data)

  reply.status(200).send({
    pets,
  })
}
