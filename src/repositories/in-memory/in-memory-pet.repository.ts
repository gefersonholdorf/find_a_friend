import type { Prisma, Pet } from '@prisma/client'
import type { ParamsFindAll, PetRepository } from '../pet.repository'
import { randomUUID } from 'node:crypto'
import type { OrgRepository } from '../org.repository'

export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = []

  constructor(private orgRepository: OrgRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      org_id: data.org_id,
    }

    this.pets.push(pet)

    return pet
  }
  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find(pet => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
  async findAll(params: ParamsFindAll): Promise<Pet[] | null> {
    const orgs = await this.orgRepository.findByCity(params.city)

    if (!orgs || orgs.length === 0) {
      return null
    }

    const orgIds = orgs.map(org => org.id)

    const filteredPets = this.pets.map(async pet => {
      if (!orgIds.includes(pet.org_id)) {
        return false
      }

      if (params.name && !pet.name.includes(params.name)) return false
      if (params.about && !pet.about.includes(params.about)) return false
      if (params.age && pet.age !== params.age) return false
      if (params.size && pet.size !== params.size) return false
      if (params.energy_level && pet.energy_level !== params.energy_level)
        return false
      if (params.environment && pet.environment !== params.environment)
        return false

      return true
    })

    return this.pets.filter((_, index) => filteredPets[index])
  }
}
