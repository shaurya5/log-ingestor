# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory to /client
WORKDIR /client

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port that your ReactJS application will run on
EXPOSE 3001

# Command to run your ReactJS application
CMD ["yarn", "start"]
