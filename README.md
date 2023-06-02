# IoT Project

## Prepare containers

```bash
docker run -d --network host --name nodered -v ./.nodered:/data nodered/node-red
docker run -d --name postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=iot postgres
```

## Install dependencies
```bash
yarn install --frozen-lockfile
```

## Run migrations
```bash
yarn run migration:run
```

## Start the app

```bash
yarn run start
```

## Or run it with docker compose
```bash
docker compose up -d
```
