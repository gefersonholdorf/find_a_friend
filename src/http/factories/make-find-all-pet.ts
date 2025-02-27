import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet.repository'
import { FindAllPetService } from '../services/pet/find-all-pet.service'

export function makeFindAllPet() {
  const petRepository = new PrismaPetRepository()
  const findAllService = new FindAllPetService(petRepository)

  return findAllService
}
