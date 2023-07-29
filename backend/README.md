## Engines Requirement

`node: >=18.16.0`  
`npm: >=9.5.0`

## Getting Started

### Create .env files

```bash
# at the root of the repository
# copy and set the backend related appropriate values
cp .env.example .env

# at the ./backend directory
# copy and set the backend related appropriate values
cp .env.example .env
```

### Run from host machine

> :warning: **You must at the ./backend directory**

```bash
# install packages
npm i

# generate prisma client
npm run prisma:generate

# run dev server
npm run start:dev

# run prisma studio
npm run prisma:studio
```

### Run with docker

> :warning: **You must at the root of the repository**

```bash
docker compose -f ./docker-compose.development.yml up backend database -d --build

# run prisma studio
docker compose -f ./docker-compose.development.yml exec backend sh

# if docker command executed successfuly, run
npm run prisma:studio
```
