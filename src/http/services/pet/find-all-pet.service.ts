import type { Pet } from '@prisma/client'
import type {
  ParamsFindAll,
  PetRepository,
} from '../../../repositories/pet.repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found'

export interface FindAllPetServiceInput extends ParamsFindAll {}

export interface FindAllPetServiceOutput {
  pets: Pet[]
}

export class FindAllPetService {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: FindAllPetServiceInput
  ): Promise<FindAllPetServiceOutput> {
    const pets = await this.petRepository.findAll(data)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
