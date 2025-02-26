import type { Pet } from '@prisma/client'
import type { PetRepository } from '../../../repositories/pet.repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found'
import type { OrgRepository } from '../../../repositories/org.repository'

export interface FindByCityPetServiceInput {
  city: string
}

export interface FindByCityPetServiceOutput {
  pets: Pet[]
}

export class FindByCityPetService {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository
  ) {}

  async execute(
    data: FindByCityPetServiceInput
  ): Promise<FindByCityPetServiceOutput> {
    const orgs = await this.orgRepository.findByCity(data.city)

    if (!orgs) {
      throw new ResourceNotFoundError()
    }
    const idOrgs = await orgs.map(org => org.id)

    const pets = await this.petRepository.findByCity(idOrgs)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
