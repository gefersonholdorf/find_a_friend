import type { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCharacteristics(query: string[]): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
  findByCity(orgs: string[]): Promise<Pet[] | null>
}
