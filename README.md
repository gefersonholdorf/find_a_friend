### Find a Friend - Pet Adoption Platform
A plataforma Find a Friend é um sistema desenvolvido para ajudar a conectar pessoas com animais de estimação disponíveis para adoção. 
Os usuários podem explorar animais de estimação disponíveis, filtrá-los com base em características específicas e entrar em contato com organizações 
(ORGs) que gerenciam adoções de animais de estimação. As organizações podem registrar e gerenciar seus animais de estimação disponíveis, enquanto os usuários podem contatá-los diretamente via WhatsApp.

### ### Regras da aplicação

- [S] Deve ser possível cadastrar um pet
- [S] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [S] Deve ser possível filtrar pets por suas características
- [S] Deve ser possível visualizar detalhes de um pet para adoção
- [S] Deve ser possível se cadastrar como uma ORG
- [S] Deve ser possível realizar login como uma ORG
- [] Deve ser possível cadastrar apenas sendo um ORG

### Regras de negócio

- [S] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [S] Uma ORG precisa ter um endereço e um número de WhatsApp
- [S] Um pet deve estar ligado a uma ORG
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [S] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada