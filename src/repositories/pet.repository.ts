import type { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCity(city: string): Promise<Pet[] | null>
  findByCharacteristics(query: string[]): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
}
