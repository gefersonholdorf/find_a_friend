import type { Pet } from '@prisma/client'
import type { PetRepository } from '../../../repositories/pet.repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found'

export interface FindByIdPetServiceInput {
  id: string
}

export interface FindByIdPetServiceOutput {
  pet: Pet
}

export class FindByIdPetService {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: FindByIdPetServiceInput
  ): Promise<FindByIdPetServiceOutput> {
    const pet = await this.petRepository.findById(data.id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
