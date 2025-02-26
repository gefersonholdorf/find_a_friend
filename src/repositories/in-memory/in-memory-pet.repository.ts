import type { Prisma, Pet } from '@prisma/client'
import type { PetRepository } from '../pet.repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
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
  async findByCity(city: string): Promise<Pet[] | null> {
    throw new Error('Method not implemented.')
  }
  async findByCharacteristics(query: string[]): Promise<Pet[] | null> {
    throw new Error('Method not implemented.')
  }
  async findById(id: string): Promise<Pet | null> {
    throw new Error('Method not implemented.')
  }
}
