# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json, yarn.lock
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Install PM2 globally
RUN yarn global add pm2

# Copy the rest of the application code
COPY . .

# Compile Typescript
RUN yarn build

# Expose the port your application will run on
EXPOSE 3000

# Start the application using PM2
CMD ["pm2-runtime", "start", "pm2.config.js"]
