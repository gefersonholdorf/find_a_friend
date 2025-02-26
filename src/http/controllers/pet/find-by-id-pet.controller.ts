import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import type { FindByIdPetServiceInput } from '../../services/pet/find-by-id-pet.service'
import { makeFindByIdPet } from '../../factories/make-find-by-id-pet'

export async function findByIdPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = request.params

  const findByIdPetSchema = z.object({
    id: z.string(),
  })

  await findByIdPetSchema.parse(params)

  const data = request.params as FindByIdPetServiceInput

  const findByIdPetService = makeFindByIdPet()

  const { pet } = await findByIdPetService.execute(data)

  reply.status(201).send({
    pet,
  })
}
