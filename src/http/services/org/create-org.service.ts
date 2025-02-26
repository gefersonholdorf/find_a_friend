import { hash } from 'bcryptjs'
import type { OrgRepository } from '../../../repositories/org.repository'
import { OrgAlreadyExistsError } from '../../errors/org-already-exists'

export interface CreateOrgServiceInput {
  author_name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

export class CreateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(data: CreateOrgServiceInput) {
    const orgWithExistingEmail = await this.orgRepository.findByEmail(
      data.email
    )

    if (orgWithExistingEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password = await hash(data.password, 6)

    const org = await this.orgRepository.create({
      ...data,
      password,
    })

    return {
      org,
    }
  }
}
