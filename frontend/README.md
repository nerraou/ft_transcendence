## Engines Requirement

`node: >=18.16.0`  
`npm: >=9.5.0"`

## Getting Started

> :warning: **You must be inside ./frontend directory**

### Run from host machine

```bash
# install packages
npm i

# run dev server
npm run dev
```

### Run with docker

```bash
docker compose -f docker/docker-compose.development.yml up -d --build
```

## Storybook

> :warning: **You must be inside ./frontend directory**

### Run Storybook from host machine

```bash
npm run storybook
```

### Run Storybook from docker

```bash
docker compose -f docker/docker-compose.development.yml exec app sh

# if docker command executed successfuly, run
npm run storybook
```

Open [http://localhost:3000](http://localhost:300) with your browser to see the result.

## Commits

[How to commit](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)
