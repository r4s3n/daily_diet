# Daily Diet API

API para controle de refeições e acompanhamento de dieta, permitindo que usuários registrem refeições, acompanhem métricas e monitorem sua evolução alimentar.

## Tecnologias

* Node.js
* TypeScript
* Fastify
* Prisma ORM
* PostgreSQL
* Docker
* Zod

---

## Funcionalidades

### Usuários

* Criar um usuário
* Identificar o usuário entre as requisições

### Refeições

* Registrar uma refeição
* Editar uma refeição
* Excluir uma refeição
* Listar todas as refeições de um usuário
* Visualizar uma refeição específica

Cada refeição possui:

* Nome
* Descrição
* Data e Hora
* Indicação se está dentro ou fora da dieta

Todas as refeições são vinculadas a um usuário.

---

## Métricas

A aplicação disponibiliza métricas individuais para cada usuário:

* Quantidade total de refeições registradas
* Quantidade total de refeições dentro da dieta
* Quantidade total de refeições fora da dieta
* Melhor sequência de refeições dentro da dieta

---

## Regras de Negócio

* Um usuário pode criar diversas refeições.
* Cada refeição pertence a apenas um usuário.
* Um usuário só pode visualizar suas próprias refeições.
* Um usuário só pode editar suas próprias refeições.
* Um usuário só pode excluir suas próprias refeições.
* As métricas devem considerar apenas as refeições do usuário autenticado.

---

## Estrutura da Aplicação

A aplicação segue uma arquitetura baseada em:

* Controllers
* Use Cases
* Repositories
* Prisma ORM
* PostgreSQL

Fluxo:

Controller → Use Case → Repository → Database

---

## Executando o Projeto

### Instalar dependências

```bash
pnpm install
```

### Executar migrations

```bash
pnpm prisma migrate dev
```

### Iniciar aplicação

```bash
pnpm dev
```

---

## Objetivo

Este projeto foi desenvolvido para praticar conceitos de:

* APIs REST
* TypeScript
* Prisma ORM
* PostgreSQL
* Docker
* Arquitetura de Software
* Regras de Negócio
* Boas práticas de desenvolvimento backend

