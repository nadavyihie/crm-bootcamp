# crm-bootcamp



### Pre docker
Please make sure you have created a `data/mysql` folder at your directory.
`mkdir -p data/mysql`

### Docker compose commands:
Start all services that declared at `docker-compose.yml`

```
docker compose up
```
to run in background:

```
docker compose up -d
```

To start individual service:

```
docker compose up php
```

Or couple of services followed one after one:

```
docker compose up php mysql
```

use `-d` to run detached at background.

`docker compose down` - to stop every running service container.

`docker compose build` - will build all services , build command works on service with `Dockerfile` that was generated by user.

`docker compose pull` - will pull new image versions if available.

`docker compose ps` - check which docker compose services are running

`docker ps` - show all running containers

`docker compose exec php bash` - run a command in running docker compose service container.

`docker exec -it {CONTAINER_ID}/{CONTAINER_NAME} bash` - run a command in running container.

