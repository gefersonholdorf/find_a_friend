import type { FastifyInstance } from 'fastify'
import { CreateOrgController } from '../controllers/org/create-org.controller'
import { AuthenticateOrgController } from '../controllers/org/authenticate-org.controller'

export function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', CreateOrgController)
  app.post('/session', AuthenticateOrgController)
}
