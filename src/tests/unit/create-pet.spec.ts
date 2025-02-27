import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-org.repository'
import type { OrgRepository } from '../../repositories/org.repository'
import { OrgAlreadyExistsError } from '../../http/errors/org-already-exists'
import type { PetRepository } from '../../repositories/pet.repository'
import { CreatePetService } from '../../http/services/pet/create-pet.service'
import { InMemoryPetRepository } from '../../repositories/in-memory/in-memory-pet.repository'

let petRepository: PetRepository
let orgRepository: OrgRepository
let petService: CreatePetService

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

const createPet = {
  name: 'Alfredo',
  about: 'Eu sou um lindo doguindo de 3 anos.',
  age: 'Filhote',
  size: 'Pequeninho',
  energy_level: 'Baixa',
  environment: 'Ambiente amplo',
  org_id: 'org-01',
}

describe('Create Pet Service', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    petService = new CreatePetService(petRepository, orgRepository)
    await orgRepository.create(createOrg)
  })
  it('should be able create pet', async () => {
    const { pet } = await petService.execute(createPet)

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be able to return an error when providing a non-existing org', async () => {
    await expect(async () => {
      await petService.execute({
        ...createPet,
        org_id: 'org-02',
      })
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
