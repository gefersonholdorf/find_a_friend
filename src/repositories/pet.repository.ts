import type { Pet, Prisma } from '@prisma/client'

export interface ParamsFindAll {
  city: string
  name?: string
  about?: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findAll(params: ParamsFindAll): Promise<Pet[] | null>
}
