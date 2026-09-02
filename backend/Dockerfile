# Use official Node.js Alpine image for lightweight footprint
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose backend port
EXPOSE 5000

# Set environment variables
ENV PORT=5000
ENV NODE_ENV=production

# Start backend server
CMD ["node", "server.js"]
