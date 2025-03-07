import type { Prisma, Org } from '@prisma/client'
import type { OrgRepository } from '../org.repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryOrgsRepository implements OrgRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = {
      id: data.id ? data.id : randomUUID(),
      author_name: data.author_name,
      email: data.email,
      whatsapp: data.whatsapp,
      password: data.password,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.orgs.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find(org => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find(org => org.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByCity(city: string): Promise<Org[] | null> {
    const orgs = this.orgs.filter(org => org.city === city)

    if (orgs.length <= 0) {
      return null
    }

    return orgs
  }
}
