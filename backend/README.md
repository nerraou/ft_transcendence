## Engines Requirement

`node: >=18.16.0`  
`npm: >=9.5.0`

## Getting Started

### Create .env files

> :warning: **Check Create .env files step in ./frontend**

```bash
# at the root of the repository
# copy and set the backend related values
cp .env.example .env

# at the ./backend directory
# copy and set the backend related values
cp .env.example .env
```

### Run database container

> :warning: **You must be at the root of the repository**

```bash
docker compose -f ./docker-compose.development.yml up database -d --build
```

### Run from host machine

> :warning: **In ./backend/.env, change database host in DATABASE_URL to `localhost`**
> :warning: **In ./backend/.env, change redis host to `localhost`**

> :warning: **Change directory to ./backend**

```bash
# install packages
npm i

# generate prisma client
npm run prisma:generate

# run prisma migrations
npm run prisma:migrate:dev

# to run dev server
npm run start:dev

# to run prisma studio
npm run prisma:studio
```

### Run with docker

> :warning: **You must be at the root of the repository**

> :warning: **In ./backend/.env, change database host in DATABASE_URL to `database`**
> :warning: **In ./backend/.env, change redis host to `redis`**

```bash
docker compose -f ./docker-compose.development.yml up backend database redis -d --build

# run prisma studio
docker compose -f ./docker-compose.development.yml exec backend sh

# if docker command executed successfuly, run
npm run prisma:studio
```
