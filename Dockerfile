# Use the specific Node version
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy your project files into the Docker container
COPY . .

# Ensure the Prisma CLI is installed
RUN npm install prisma --save-dev

# Generate the Prisma client
RUN npx prisma generate

# Expose the port your app runs on
EXPOSE 3000

# Set environment variables
# NOTE: For security reasons, use Docker secrets or Render's environment variables feature instead of hardcoding here
# ENV NODE_ENV=production
# ENV DATABASE_URL=yourDatabaseConnectionString
# ENV JWT_SECRET=yourJWTSecretKey

# Command to run your app
CMD ["node", "index.js"]
