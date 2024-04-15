# Use official Node.js image as base
FROM node:latest

# Install necessary dependencies for sharp
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    python3 \
    libvips \
    libvips-dev \
    libjpeg-dev \
    libpng-dev \
    libgif-dev \
    webp

# Set the working directory in the container
WORKDIR /usr/src/app


# Copy package.json and package-lock.json or yarn.lock to the working directory
COPY package*.json ./

# Install dependencies using either npm or yarn
RUN yarn install

RUN yarn add sharp --ignore-engines

# Copy the rest of the application code to the working directory
COPY . .

COPY .git .

# Expose the port your app runs on
#EXPOSE 8080

#RUN yarn run build

#WORKDIR /usr/src/app/dist

# Command to run your application
# or if you prefer yarn
#CMD ["python3", "-m", "http.server"]

EXPOSE 5173

CMD ["yarn", "run", "start", "--host", "0.0.0.0"]
