Jump to [template](#template)

# 2025
## October
### 14 October 2025
- What I did
    - Implementented Update for Player
    - Implemented Delete for Player
    - Created shared enum and type for Player
    - Refactored Player module to  use shared Player type
    - Update dev_logs formatting to account for future development
- What I learned
    - != checks value while !== checks type and value
    - Previously, API responses returned raw database entities, which tightly coupled the frontend to the backend's internal schema. By introducing shared types, the backend transforms those entities into clean, consistent objects before sending them to the frontend. This decouples the API from the database and allows both frontend and backend to rely on the same type definitions, making data handling, validation, and integration much easier and more reliable.
    - React components favor composition over inheritance: child components dont inherit their parent component like classes do. In other words, it's a "has-a" relationship instead of "is-a" relationship. This is done through nesting child components inside their parent component folder. To use it, import the component and call `<ChildComponent />`. To use the parent widget's basic structure, do `<ParentComponent> <ChildComponent /> <ParentComponent>`. The logic will be implemented in `ChildComponent.tsx`.
- Known Issues
    - Docker command in root readme to remove the module volumes does not work

### 14 October 2025
- What I did
    - Started the implementation of Update and Delete Player
- What I learned
    - PATCH vs. PUT - PUT updates all fields while PATCH updates select fields. There doesn't need to be a PATCH request for every field- just one and all fields you can choose whether the user can edit or not
    - CRUD: Create, Read, Update, Delete- even if you don't plan to use certain parts of the acronym, it's good practice to implement them to complete the full data cycle.
- Known Issues
    - None

### 13 October 2025
- What I did
    - Optimized Docker environment
    - Connected backend to database via TypeORM
    - Added Swagger for easy endpoint documentation
    - Refactored User Information feature to Player for clarity
        - User authnetication is being considered at a later date. Users may have accounts across regions defined here as "Player"
    - Implemented backend logic for feature #6
- What I learned
    - When adding new packages, it is important to rebuild as well as take down any volumes. Otherwise the packages will downloaded on local will not be seen by Docker.
    - It is good practice to add userID to data, even if multiple users will not be implemented for a while
    - DTOs outline what is needed from the user. Ex: authentication. The DTO would ask for username and password- the user does not need to know their ID in the system
    - How to use Swagger API decorators to document a developing API
- Known Issues
    - None

### 10 October 2025
- What I did
    - Decided on first version of color palette
    - Began initial planning of feature #3
    - Began initial planning of feature #4
    - Began initial planning of feature #5
    - Created the skeleton for the UI of the app (Sidebar, Widget  [base])
- What I learned
    - UI toolkits such as Tailgrid exist such that I can focus on the implementation of the dashboard and not designing every little component
- Known Issues
    - Web app does not update when files are saved. Frontend Docker container must be restarted to see change

### 09 October 2025
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
- Known Issues
    - None

### Previously:
- Learned the basics of NestJS through building a REST API with PostgreSQL through following a tutorial to create a simple task list
- Learned how to create GET, POST, and DELETE requests in Postman
- Learned how to create a Docker container to run a NestJS app and a PostgreSQL server

# TEMPLATE
### Date
- What I did
    - here
- What I learned
    - here
- Known Issues
    - here