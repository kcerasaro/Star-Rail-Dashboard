# Star-Rail-Dashboard

Star Rail Dashboard is a personalized web dashboard designed to track the user's game content from warps to end game content. Follow the development progress [here](https://github.com/users/kcerasaro/projects/2)!

# Tech Stack
NestJS | React | Vite | PostgreSQL | Docker | Swagger

# Key Features and Goals

## Goal: 
Build a personalized web application to practice full-stack development and explore game-related data visualization.

## Key Features
- **Player Information**: Displays username and UID, with a copy-to-clipboard function.

- **Warp Tracker**: Calculates available warps based on entered currencies and a user-defined deadline.

- **Pity Tracker**: Allows manual tracking of pity for Standard, Limited Character, and Limited Lightcone banners, including guaranteed 5★ status.

- **Pity Tracker:** The user may manually update their pity for Standard, Limited Character, and Limited Lightcone banners, and define whether or not their next 5* is guaranteed or not.

- **End Game Tracker**: Shows countdowns for Memory of Chaos, Pure Fiction, Apocalyptic Shadow, and Anomaly Arbitration resets.

- **To-Do List**: Lets users track in-game tasks like quests, exploration, and objectives.

- **Run Showcase**: Embeds a user’s YouTube playlist to display gameplay runs.

# Environment Notes
## Docker
After downloading modules locally, take down the modules volumes.
> IMPORTANT: Deleting the `pgdata` volume will delete all database data
```
# Remove only node_modules volumes (safe for dependency resets)
docker volume rm star-rail-dashboard_frontend_node_modules star-rail-dashboard_backend_node_modules

# Stop all containers (preserves volumes unless -v is used)
docker-compose down

# Rebuild containers
docker-compose build

# Rebuild containers from scratch (no cache)
docker-compose build --no-cache

# Start containers
docker-compose up

# Start containers and rebuild first
docker-compose up --build
```

## Adding Packages
When adding packages in the frontend or backend, the module containers must be removed:
```
# navigate to the correct workspace
cd srd-front-end
cd srd-back-end

# add package to frontend/backend
pnpm add <packageName>

# ensure all packages are updated and installed
pnpm install

# take down docker containers
docker-compose down

# Remove only the volume for the workspace you updated
# Example: if you added a frontend package
docker volume rm star-rail-dashboard_frontend_node_modules

# rebuild and start the environment
docker-compose up --build
```

# Screenshots
*coming soon*
