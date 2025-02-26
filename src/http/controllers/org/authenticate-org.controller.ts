import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateOrg } from '../../factories/make-authenticate-org'
import type { AuthenticateOrgServiceInput } from '../../services/org/authenticate.service'

export async function AuthenticateOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateOrgSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  await authenticateOrgSchema.parse(request.body)

  const authenticateOrgService = makeAuthenticateOrg()

  const data = request.body as AuthenticateOrgServiceInput

  const { token } = await authenticateOrgService.execute(data)

  reply.status(200).send({
    token,
  })
}
