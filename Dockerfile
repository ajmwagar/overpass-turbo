# Use official Node.js image as base
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json or yarn.lock to the working directory
COPY package*.json ./

# Install dependencies using either npm or yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Command to run your application
# or if you prefer yarn
CMD ["yarn", "run", "start"]

