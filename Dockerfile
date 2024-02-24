
FROM node:16-alpine


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Define environment variables
# ENV NODE_ENV=production
# ENV DATABASE_URL=yourDatabaseConnectionString
# ENV JWT_SECRET=yourJWTSecretKey

# Command to run the app
CMD ["node", "index.js"]
