import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../../../repositories/in-memory/in-memory-org.repository'
import { CreateOrgService } from './create-org.service'
import type { OrgRepository } from '../../../repositories/org.repository'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../../errors/org-already-exists'

let orgRepository: OrgRepository
let orgService: CreateOrgService
const createOrg = {
  author_name: 'Antônio Bandeira',
  email: 'antonio@gmail.com',
  whatsapp: '47 991122432',
  password: 'senha123',
  cep: '89124000',
  state: 'SC',
  city: 'Benedito Novo',
  neighborhood: 'Rio Tigre',
  street: 'Rua Interbairros',
  latitude: -26.7694726,
  longitude: -49.3700684,
}

describe('Create Org Service', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    orgService = new CreateOrgService(orgRepository)
  })
  it('should be able create org', async () => {
    const { org } = await orgService.execute(createOrg)

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be able to return an error when providing an existing email', async () => {
    await orgService.execute(createOrg)

    const orgWithExistingEmail = {
      author_name: 'Antônio Bandeira',
      email: 'antonio@gmail.com',
      whatsapp: '47 991122432',
      password: 'senha123',
      cep: '89124000',
      state: 'SC',
      city: 'Benedito Novo',
      neighborhood: 'Rio Tigre',
      street: 'Rua Interbairros',
      latitude: -26.7694726,
      longitude: -49.3700684,
    }

    await expect(async () => {
      await orgService.execute(orgWithExistingEmail)
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should be able to verify if the password is a hash', async () => {
    const password = 'senha123'

    const { org } = await orgService.execute(createOrg)

    const isPaswordValid = await compare(password, org.password)

    expect(isPaswordValid).toEqual(true)
  })
})
