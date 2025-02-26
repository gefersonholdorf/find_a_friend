import type { Prisma, Pet } from '@prisma/client'
import type { PetRepository } from '../pet.repository'
import { prismaClient } from '../../config/prisma/client'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prismaClient.pet.create({
      data,
    })

    return pet
  }
  async findByCharacteristics(query: string[]): Promise<Pet[] | null> {
    if (!query.length) {
      const pets = await prismaClient.pet.findMany()
      return pets
    }

    const pets = await prismaClient.pet.findMany({
      where: {
        OR: [
          { name: { in: query } },
          { about: { contains: query[0], mode: 'insensitive' } },
          { age: { in: query } },
          { size: { in: query } },
          { energy_level: { in: query } },
          { environment: { in: query } },
        ],
      },
    })

    if (!pets) {
      return null
    }

    return pets
  }
  async findById(id: string): Promise<Pet | null> {
    const pet = await prismaClient.pet.findUnique({
      where: {
        id,
      },
    })

    if (!pet) {
      return null
    }

    return pet
  }
  async findByCity(orgs: string[]): Promise<Pet[] | null> {
    const pets = await prismaClient.pet.findMany({
      where: {
        org_id: {
          in: orgs,
        },
      },
    })

    if (!pets) {
      return null
    }

    return pets
  }
}
