# IoT Project

## Prepare containers

```bash
docker run -d --network host --name mosquitto -p 1883:1883 eclipse-mosquitto
docker run -d --network host --name nodered -p 1880:1880 -v node_red_data:/data nodered/node-red
docker run -d --name postgres -p 5432:5432 -e POSTGRES_USER=iot -e POSTGRES_PASSWORD=iot -e POSTGRES_DB=iot postgres
```

## Run migrations
```bash
yarn run migration:run
```

## Start the app

```bash
yarn run start
```
