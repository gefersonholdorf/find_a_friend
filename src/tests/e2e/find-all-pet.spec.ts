import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect } from 'vitest'
import { it } from 'vitest'
import { prismaClient } from '../../config/prisma/client'
import request from 'supertest'
import { app } from '../../app'

let tokenOrg: string

describe('Find Pet All [E2E]', () => {
  beforeAll(async () => {
    app.ready()
    await prismaClient.$executeRawUnsafe('TRUNCATE TABLE pets;')
    await prismaClient.$executeRawUnsafe('TRUNCATE TABLE orgs CASCADE;')
    await execSync('prisma migrate deploy')
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to find pet all', async () => {
    await request(app.server).post('/orgs').send({
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
    })

    const authenticate = await request(app.server).post('/session').send({
      email: 'antonio@gmail.com',
      password: 'senha123',
    })

    const { token } = authenticate.body
    tokenOrg = token
    console.log(tokenOrg)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${tokenOrg}`)
      .send({
        name: 'Alfredo',
        about: 'Eu sou um lindo doguindo de 3 anos.',
        age: 'Filhote',
        size: 'Pequeninho',
        energy_level: 'Baixa',
        environment: 'Ambiente amplo',
        org_id: 'org-01',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${tokenOrg}`)
      .send({
        name: 'Juca',
        about: 'Eu sou um lindo doguindo de 3 anos.',
        age: 'Filhote',
        size: 'Pequeninho',
        energy_level: 'Baixa',
        environment: 'Ambiente amplo',
        org_id: 'org-01',
      })

    const response = await request(app.server)
      .get('/pets?city=Benedito%20Novo&&name=Juca')
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
