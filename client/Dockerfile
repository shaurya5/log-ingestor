# Use an official Node runtime as a base image
FROM node:18.13.0

# Set the working directory in the container
WORKDIR /client

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Copy the application code into the container
COPY . .

EXPOSE 3003

# Build the React app for production
RUN yarn build

# Specify the command to run on container startup
CMD ["yarn", "start"]
