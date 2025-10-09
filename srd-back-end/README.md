# Setup
## Prerequisites
Ensure you have the following: 
1. Docker
2. NestJS
3. Postman
4. PostgreSQL

# Docker
Run the following command to set up the docker container:

```
docker-compose up
```

More commands:

```
docker ps             # check status of Docker containers
docker-compose down   #takes down Docker containers
```

# PostgreSQL
Ensure your local PostgreSQL instance matches the following:
1. Database name: `srdb`
2. Username: `starraildashboard`
3. Password: `srdb12345`
4. Port: `5432` (`5433` if 5432 is unavailable)
5. Host: `localhost`

# Running the app
Start the NestJS app in development:

```
pnpm run start:dev
```

# Endpoints
*coming soon*