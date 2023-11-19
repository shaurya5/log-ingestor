# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory to /server
WORKDIR /server

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port that your Node.js application will run on
EXPOSE 3000

# Command to run your Node.js application
CMD ["node", "index.js"]
