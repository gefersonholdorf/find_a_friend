import type { Pet } from '@prisma/client'
import type {
  ParamsFindAll,
  PetRepository,
} from '../../../repositories/pet.repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found'

export interface FindByCityPetServiceInput extends ParamsFindAll {}

export interface FindByCityPetServiceOutput {
  pets: Pet[]
}

export class FindByCityPetService {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: FindByCityPetServiceInput
  ): Promise<FindByCityPetServiceOutput> {
    const pets = await this.petRepository.findAll(data)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
