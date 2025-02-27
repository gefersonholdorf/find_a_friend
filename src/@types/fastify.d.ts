import { FastifyRequest } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    org?: string
  }
}
