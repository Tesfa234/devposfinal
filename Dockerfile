# Use official Node.js image as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app
CMD ["node", "server.js"]