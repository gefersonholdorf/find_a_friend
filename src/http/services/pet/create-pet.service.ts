import type { OrgRepository } from '../../../repositories/org.repository'
import type { PetRepository } from '../../../repositories/pet.repository'
import { OrgAlreadyExistsError } from '../../errors/org-already-exists'

export interface CreatePetServiceInput {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  environment: string
  org_id: string
}

export class CreatePetService {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository
  ) {}

  async execute(data: CreatePetServiceInput) {
    const isExistingOrg = await this.orgRepository.findById(data.org_id)

    if (!isExistingOrg) {
      throw new OrgAlreadyExistsError()
    }

    const pet = await this.petRepository.create(data)

    return { pet }
  }
}
