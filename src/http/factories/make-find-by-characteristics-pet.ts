import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet.repository'
import { findByCharacteristicsPetService } from '../services/pet/find-by-characteristics-pet.service'

export function makeFindByCharacteristicsPet() {
  const petRepository = new PrismaPetRepository()
  const findByCharacteristicsPet = new findByCharacteristicsPetService(
    petRepository
  )

  return findByCharacteristicsPet
}
