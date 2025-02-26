import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import type { CreatePetServiceInput } from '../../services/pet/create-pet.service'
import { makeCreatePet } from '../../factories/make-create-pet'

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createPetSchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    environment: z.string(),
    org_id: z.string(),
  })

  await createPetSchema.parse(request.body)

  const data = request.body as CreatePetServiceInput

  const createPetService = makeCreatePet()

  await createPetService.execute(data)

  reply.status(201).send()
}
