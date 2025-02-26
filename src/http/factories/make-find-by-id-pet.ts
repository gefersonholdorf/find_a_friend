import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet.repository'
import { FindByIdPetService } from '../services/pet/find-by-id-pet.service'

export function makeFindByIdPet() {
  const petRepository = new PrismaPetRepository()
  const findByIdPet = new FindByIdPetService(petRepository)

  return findByIdPet
}
