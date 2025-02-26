import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org.repository'
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet.repository'
import { FindByCityPetService } from '../services/pet/find-by-city-pet.service'

export function makeFindAllPet() {
  const petRepository = new PrismaPetRepository()
  const findByCityPetService = new FindByCityPetService(petRepository)

  return findByCityPetService
}
