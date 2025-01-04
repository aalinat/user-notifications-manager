# Use Node 16 LTS
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy source code and build
COPY . .
RUN yarn build

# Start application
CMD ["node", "dist/index.js"]