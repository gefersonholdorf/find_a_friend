import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org.repository'
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet.repository'
import { FindByCityPetService } from '../services/pet/find-by-city-pet.service'

export function makeFindByCityPet() {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()
  const findByCityPetService = new FindByCityPetService(
    petRepository,
    orgRepository
  )

  return findByCityPetService
}
