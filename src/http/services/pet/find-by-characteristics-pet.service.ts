import type { Pet } from '@prisma/client'
import type { PetRepository } from '../../../repositories/pet.repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found'

export interface findByCharacteristicsPetServiceInput {
  name?: string
  about?: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

export interface findByCharacteristicsPetServiceOutput {
  pets: Pet[]
}

export class findByCharacteristicsPetService {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: findByCharacteristicsPetServiceInput
  ): Promise<findByCharacteristicsPetServiceOutput> {
    const query = [
      `${data.name}`,
      `${data.about}`,
      `${data.age}`,
      `${data.energy_level}`,
      `${data.environment}`,
      `${data.size}`,
    ]
    const pets = await this.petRepository.findByCharacteristics(query)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
