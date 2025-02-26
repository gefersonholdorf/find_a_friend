import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org.repository'
import { AuthenticateOrgService } from '../services/org/authenticate.service'

export function makeAuthenticateOrg() {
  const orgRepository = new PrismaOrgRepository()
  const authenticateOrgService = new AuthenticateOrgService(orgRepository)

  return authenticateOrgService
}
