import fastify from 'fastify'
import { ZodError } from 'zod'
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { orgRoutes } from './http/routes/org.routes'

export const app = fastify()

app.register(orgRoutes)

app.get('/status', (request, reply) => {
  reply.send({
    status: 'CONNECT',
  })
})

app.setErrorHandler(
  (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    return reply.status(500).send({
      message: error.message,
    })
  }
)
