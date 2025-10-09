# 09 October 2025
- What I did
    - Decided on monorepo for web app project
    - Defined starting features
    - Developed project structure
    - Began back-end documentation
    - Began initial planning of feature #1
    - Began initial planning of feature #6
    - Began initial planning of feature #2
- What I learned
    - A monorepo works for smallscale learning projects such as this one
    - A Docker file should be created for the front end and back end individually so that their containers can be made. A docker-compose.yml reference both Dockerfiles from the root of the project to create the environment where all three parts (front end, back end, data) can run
    - Vite is a building tool, such as Expo is a building tool for mobile apps

# Previously:
- Learned the basics of NestJS through building a REST API with PostgreSQL through following a tutorial to create a simple task list
- Learned how to create GET, POST, and DELETE requests in Postman
- Learned how to create a Docker container to run a NestJS app and a PostgreSQL server