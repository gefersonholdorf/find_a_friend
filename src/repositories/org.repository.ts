import type { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
  findByCity(city: string): Promise<Org[] | null>
}
