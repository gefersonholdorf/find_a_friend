import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-org.repository'
import type { OrgRepository } from '../../repositories/org.repository'
import { OrgAlreadyExistsError } from '../../http/errors/org-already-exists'
import type { PetRepository } from '../../repositories/pet.repository'
import { InMemoryPetRepository } from '../../repositories/in-memory/in-memory-pet.repository'
import { ResourceNotFoundError } from '../../http/errors/resource-not-found'
import { FindAllPetService } from '../../http/services/pet/find-all-pet.service'

let petRepository: PetRepository
let orgRepository: OrgRepository
let petService: FindAllPetService

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
  name: 'Alfredo',
  about: 'Eu sou um lindo doguindo de 3 anos.',
  age: 'Filhote',
  size: 'Pequeninho',
  energy_level: 'Baixa',
  environment: 'Ambiente amplo',
  org_id: 'org-01',
}

const createPet02 = {
  name: 'Juca',
  about: 'Eu sou um lindo doguindo de 3 anos.',
  age: 'Filhote',
  size: 'Pequeninho',
  energy_level: 'Baixa',
  environment: 'Ambiente amplo',
  org_id: 'org-01',
}

describe('Find pets all Service', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    petService = new FindAllPetService(petRepository)
    await orgRepository.create(createOrg)
    await petRepository.create(createPet01)
    await petRepository.create(createPet02)
  })
  it('should be able find pet by city', async () => {
    const data = {
      city: 'Benedito Novo',
      name: 'Alfredo',
    }

    const pets = await petService.execute(data)

    expect(pets.pets.length).toEqual(2)
  })

  it('must be able to return a non-existing city', async () => {
    const city = 'Timbó'

    await expect(async () => {
      await petService.execute({ city })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
