import type { Prisma, Pet } from '@prisma/client'
import type { ParamsFindAll, PetRepository } from '../pet.repository'
import { prismaClient } from '../../config/prisma/client'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prismaClient.pet.create({
      data,
    })

    return pet
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
  async findAll(params: ParamsFindAll): Promise<Pet[] | null> {
    const pets = await prismaClient.pet.findMany({
      where: {
        name: params.name,
        about: params.about,
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        environment: params.environment,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }
}
