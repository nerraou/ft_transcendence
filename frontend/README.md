## Engines Requirement

`node: >=18.16.0`  
`npm: >=9.5.0`

### Create .env files

```bash
# at the root of the repository
# copy and set the backend related values
cp .env.example .env

# at the ./frontend directory
# copy and set the frontend related values
cp .env.example .env.local
```

## Getting Started

### Run from host machine

> :warning: **You must be at the ./frontend directory**

```bash
# install packages
npm i

# run dev server
npm run dev
```

### Run with docker

> :warning: **You must be at the root of the repository**

```bash
docker compose -f ./docker-compose.development.yml up frontend -d --build
```

## Storybook

> :warning: **You must be at the ./frontend directory**

### Run Storybook from host machine

```bash
npm run storybook
```

> :warning: **You must be at the root of the repository**

### Run Storybook from docker

```bash
docker compose -f ./docker-compose.development.yml exec frontend sh

# if docker command executed successfuly, run
npm run storybook
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commits

[How to commit](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)
