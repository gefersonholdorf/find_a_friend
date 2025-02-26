import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org.repository'
import { CreateOrgService } from '../services/org/create-org.service'

export function makeCreateOrg() {
  const orgRepository = new PrismaOrgRepository()
  const createOrgService = new CreateOrgService(orgRepository)

  return createOrgService
}
