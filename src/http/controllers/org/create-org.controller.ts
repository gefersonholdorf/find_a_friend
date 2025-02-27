import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrg } from '../../factories/make-create-org'
import type { CreateOrgServiceInput } from '../../services/org/create-org.service'

export async function CreateOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrgSchema = z.object({
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  await createOrgSchema.parse(request.body)

  const createOrgService = makeCreateOrg()

  const data = request.body as CreateOrgServiceInput

  const { org } = await createOrgService.execute(data)

  reply
    .setCookie('org', org.id, { httpOnly: true, secure: false })
    .status(201)
    .send()
}
