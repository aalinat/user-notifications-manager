
## Docker

```shell
docker build -t user-notifications-manager .
docker run -p 8080:8080 user-notifications-manager
```

## Running in production

```shell
yarn install --production
yarn build
node dist/index.js
```

## NVM

```shell
nvm install 16
nvm use 16
```