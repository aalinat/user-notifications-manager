
# API
- please refer to the postman collection in reference folder
# Running Locally
- please change url or the notification services to localhost if you want to run without docker
- can be fixed by multiple .env by node environment
## Docker

### Running Both Microservices
```shell
docker-compose up
```
### Building docker image (optional)
```shell
docker build -t user-notifications-manager .
docker run -p 8080:8080 user-notifications-manager
```

## Command Line

```shell
# Install
yarn install
# Building
yarn build
# Start Dev Server
yarn dev
# Start Application
yarn start
```

# Dependencies
- InversifyJS (Dependency Injection)
- Express
- Typescript
- Axios
- Nodemon

# Project Structure

- src/dal:
  - domain: contains repository and static db
  - data: main logic
    - contains API for notification service
    - definition of the contract between BL layer and DAL layer for notification manager/service
    - implementation of notification providers
      - used registry to dynamically define providers
      - used a simple in memory queue
        - to decouple async logic from controllers
        - as a boilerplate for future distributed architecture -> if the system needs scale
        - two queues: one per notification channel: since each channel can possibly have separate config: rate limiting, window
        - rate limiting is implemented via simple sliding window "algorithm"
- src/bl: service layer
- src/api: REST api layer
  - authentication: authentication provider for inversify
  - controllers: define the REST API
  - decorators: authenticate and validate middleware used on endpoints
- config: main app configuration and IoC container
- types: extension for Express Request type
- src/tests: provided a simple integration test for user preferences

## Q/A

- Why I used userId?
  - since email can be updated
- What does messageId mean?
  - should be a reference for the message, right now, the messages cannot be polled, but a storage service could be added
- Why consumer polling is running on App Start
  - very dirty solution, can be enhanced to work with Workers so the main thread is not blocked, did not do due to time constraints
