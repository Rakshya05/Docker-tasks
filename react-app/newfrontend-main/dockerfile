# Use an official Node.js runtime as a base image
FROM node:20.11 AS frontend

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install frontend dependencies
RUN yarn

# Copy the frontend source code to the container
COPY . .

# Expose the port on which the frontend will run
EXPOSE 5173

# Command to start the frontend
CMD ["yarn", "dev", "--host", "0.0.0.0"]
