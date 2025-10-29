Jump to [template](#template)

# 2025
## October
### 29 October 2025
- What I did
    - Updated PlayerService functions to validate input parameters
    - Added createPlayer and getUserById tests for input paramater validation
    - Added unit tests for getPlayerById in PlayerService
- What I learned
    - `typeof`: string, number, boolean, function, and undefined returned themselves as a string (ex: `string` returns `"string"`), and everything else returns `"object"` - even null. `!` checks null and undefined and null, so use `typeof` when checking that you're getting an object and not a string, number, etc.
    - `as any` allows a value to bypass TypeScript's static type checks, enabling you to pass parameters that would normally be rejected by the compiler. This is especially useful in testing, where you want to simulate unpredictable or invalid runtime inputs.
- Known Issues
    - here
### 28 October 2025
- What I did
    - Added unit tests for getUserById in PlayerService
- What I learned
    - Think about where data is verified. Do you need to a test to verify the service is being passes a valid userId? Or should the controller have already validated that? It will probably be good to check something like this in the service- better safe than sorry. We don't really need to test if the data is in the valid format. Rather, test if it's null/empty or if it usable.
    - Adding on to the previous point, DTO data doesn't need to be validated, but the existence of the DTO itself should be. Make sure that it's not null or undefined.
- Known Issues
    - here
### 27 October 2025
- What I did
    - Researched testing tools and how I can possibly gain experience with AI and LLMs while working on this project. Deduced maybe a chat bot can be implemented in the future
    - Wrote tests for createPlayer in the PlayerService
- What I learned
    - How write tests using Jest. `describe` allows for tests to be grouped together and organize `it` defines individual test cases. When testing service logic, database functions need to be mocked in order to not interfere with actual data. Mocked functions are manually configured to return specific values, allowing for the simulation of different behaviours to test how the code responds. 
    - Here is the general flow of how a test should be written: (1) define the parameters, (2) define the expected value, (3) simulate the function's dependencies (for service, this is the repository methods), (4) call the function that is being tested, (5) verify each dependency was called correctly, (6) assert the final result
- Known Issues
    - None
### 25 October 2025
- What I did
    - Implemented SelectFieldComponent
    - Refactored PlayerWidget to use the SelectField component
    - Added ability to cancel editing player information
    - Added error message to editing player information
    - Implented ability to copy uid to clipboard
- What I learned
    - How to use generic types in Typescript through- important for the select field as several dropdowns will be implemented, but different enums will be given
- Known Issues
    - None
### 21 October 2025
- What I did
    - Implemented InputField component
    - Refactored PlayerWidget to use the InputField component
    - Removed user-facing error widgets for now
- What I learned
    - Do not forget these shared components can do some logic, but it should only pertain to that component itself. Ex: have logic in the InputField component to display what the user types, but handle any confirmation of the entered fields in the PlayerWidget.
- Known Issues
    - None
### 17 October 2025
- What I did
    - Added Storybook to help with development of individual components
- What I learned
    - The tool Storybook: settinhg up the files, how to use, purpose of each file
- Known Issues
    - None
### 16 October 2025
- What I did
    - Fixed ports issues when connecting the frontend to the backend
    - Implemented the basics of the PlayerWidget: display namme, uid, and region
    - Implemented edit feature for PlayerWidget
- What I learned
    - How to dynamically show content inside a component based on status
    = How to use axios to make an API request
    - Think critically about what features can be turned into components. Things even as simple as styled input fields/dropdown menus that will be used throughout the web app can be turned into components
- Known Issues
    - Cancel edit needs to be implemented

### 15 October 2025
- What I did
    - Implementented Update for Player
    - Implemented Delete for Player
    - Created shared enum and type for Player
    - Refactored Player module to  use shared Player type
    - Update dev_logs formatting to account for future development
    - Began frontend development of PlayerWidget
- What I learned
    - != checks value while !== checks type and value
    - Previously, API responses returned raw database entities, which tightly coupled the frontend to the backend's internal schema. By introducing shared types, the backend transforms those entities into clean, consistent objects before sending them to the frontend. This decouples the API from the database and allows both frontend and backend to rely on the same type definitions, making data handling, validation, and integration much easier and more reliable.
    - React components favor composition over inheritance: child components dont inherit their parent component like classes do. In other words, it's a "has-a" relationship instead of "is-a" relationship. This is done through nesting child components inside their parent component folder. To use it, import the component and call `<ChildComponent />`. To use the parent widget's basic structure, do `<ParentComponent> <ChildComponent /> <ParentComponent>`. The logic will be implemented in `ChildComponent.tsx`.
    - props (properties) are immutable. They contain read-only values that are passed from the parent component to the child. If a component fetches its own data, props are not needed.
    - useEffect(lambda, []): the [] is a dependency array. It tells useEffect to run every time whatever is in this array changes. When empty, the effect runs only once when the component first mounts (added to DOM for the first time)
- Known Issues
    - Docker command in root readme to remove the module volumes does not work
    - Axios on frontend cannot get data from backend- port issues?

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