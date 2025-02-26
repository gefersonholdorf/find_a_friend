import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../../../repositories/in-memory/in-memory-org.repository'
import type { OrgRepository } from '../../../repositories/org.repository'
import { AuthenticateOrgService } from './authenticate.service'
import { hash } from 'bcryptjs'
import { InvalidCredencialsError } from '../../errors/invalid-credentials'

let orgRepository: OrgRepository
let orgService: AuthenticateOrgService
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

describe('Authenticate Org Service', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    orgService = new AuthenticateOrgService(orgRepository)
  })
  it('should be able authenticate org', async () => {
    await orgRepository.create({
      ...createOrg,
      password: await hash(createOrg.password, 6),
    })

    const email = 'antonio@gmail.com'
    const password = 'senha123'

    const { token } = await orgService.execute({
      email,
      password,
    })

    expect(token).toEqual(expect.any(String))
  })
  it('should be able to return an error when providing a wrong email', async () => {
    await orgRepository.create({
      ...createOrg,
      password: await hash(createOrg.password, 6),
    })

    const email = 'antonio123@gmail.com'
    const password = 'senha123'

    await expect(async () => {
      await orgService.execute({
        email,
        password,
      })
    }).rejects.toBeInstanceOf(InvalidCredencialsError)
  })

  it('should be able to return an error when providing a wrong password', async () => {
    await orgRepository.create({
      ...createOrg,
      password: await hash(createOrg.password, 6),
    })

    const email = 'antonio@gmail.com'
    const password = 'senha123123'

    await expect(async () => {
      await orgService.execute({
        email,
        password,
      })
    }).rejects.toBeInstanceOf(InvalidCredencialsError)
  })
})
