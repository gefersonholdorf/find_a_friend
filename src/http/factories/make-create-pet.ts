import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org.repository'
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet.repository'
import { CreatePetService } from '../services/pet/create-pet.service'

export function makeCreatePet() {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()
  const createPetService = new CreatePetService(petRepository, orgRepository)

  return createPetService
}
