import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import type { FindAllPetServiceInput } from '../../services/pet/find-all-pet.service'
import { makeFindAllPet } from '../../factories/make-find-all-pet'

export async function findAllPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = request.query

  const findAllPetSchema = z.object({
    city: z.string(),
    name: z.string().optional(),
    about: z.string().optional(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  })

  await findAllPetSchema.parse(query)

  const data = request.query as FindAllPetServiceInput

  const findAllPetService = makeFindAllPet()

  const { pets } = await findAllPetService.execute(data)

  reply.status(200).send({
    pets,
  })
}
