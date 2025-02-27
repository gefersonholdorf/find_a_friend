import type { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { env } from '../../env'

export async function verifyTokenMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = request.headers.authorization

  if (!params) {
    throw new Error('Error Token')
  }

  const [, token] = params.split(' ')

  const decode = jwt.decode(token) as JwtPayload

  request.org = decode.sub

  const isTokenValid = await jwt.verify(token, env.SECRET_KEY)

  if (!isTokenValid) {
    throw new Error('Token Invalid')
  }
}
