import type { Prisma, Org } from '@prisma/client'
import type { OrgRepository } from '../org.repository'
import { prismaClient } from '../../config/prisma/client'

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prismaClient.org.create({ data })

    return org
  }
  async findByEmail(email: string): Promise<Org | null> {
    const org = await prismaClient.org.findUnique({
      where: {
        email,
      },
    })

    if (!org) {
      return null
    }

    return org
  }
  async findById(id: string): Promise<Org | null> {
    const org = await prismaClient.org.findUnique({
      where: {
        id,
      },
    })

    if (!org) {
      return null
    }

    return org
  }
  async findByCity(city: string): Promise<Org[] | null> {
    const orgs = await prismaClient.org.findMany({
      where: {
        city,
      },
    })

    if (!orgs) {
      return null
    }

    return orgs
  }
}
