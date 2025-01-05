FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source code and build
COPY . .
RUN yarn build

# Start application
CMD ["yarn", "start"]