import type { Prisma, Pet } from '@prisma/client'
import type { PetRepository } from '../pet.repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = []

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
  async findByCharacteristics(query?: string[]): Promise<Pet[] | null> {
    if (!query) {
      return this.pets
    }

    const petFilter: Pet[] = this.pets.filter(pet =>
      query.some(
        q =>
          pet.name.includes(q) ||
          pet.about.includes(q) ||
          pet.age.includes(q) ||
          pet.size.includes(q) ||
          pet.energy_level.includes(q) ||
          pet.environment.includes(q)
      )
    )

    if (petFilter.length <= 0) {
      return null
    }

    return petFilter
  }
  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find(pet => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
  async findByCity(orgs: string[]): Promise<Pet[] | null> {
    const pets = this.pets.filter(pet => orgs.includes(pet.org_id))

    if (pets.length <= 0) {
      return null
    }

    return pets
  }
}
