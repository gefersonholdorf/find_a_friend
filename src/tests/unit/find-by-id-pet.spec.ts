import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-org.repository'
import type { OrgRepository } from '../../repositories/org.repository'
import type { PetRepository } from '../../repositories/pet.repository'
import { InMemoryPetRepository } from '../../repositories/in-memory/in-memory-pet.repository'
import { ResourceNotFoundError } from '../../http/errors/resource-not-found'
import { FindByIdPetService } from '../../http/services/pet/find-by-id-pet.service'

let petRepository: PetRepository
let orgRepository: OrgRepository
let petService: FindByIdPetService

const createOrg = {
  id: 'org-01',
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

const createPet01 = {
  id: 'pet-01',
  name: 'Alfredo',
  about: 'Eu sou um lindo doguindo de 3 anos.',
  age: 'Filhote',
  size: 'Pequeninho',
  energy_level: 'Baixa',
  environment: 'Ambiente amplo',
  org_id: 'org-01',
}

describe('[UNIT] Find Pet by id Service', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    petService = new FindByIdPetService(petRepository)
    await orgRepository.create(createOrg)
    await petRepository.create(createPet01)
  })
  it('should be able find pet by id', async () => {
    const id = 'pet-01'
    const { pet } = await petService.execute({ id })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be able to return an error when providing a non-existent id', async () => {
    const id = 'pet-02'

    await expect(async () => {
      await petService.execute({ id })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
