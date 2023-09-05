FROM node:18-alpine


# app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./


# Bundle app source code inside docker image
COPY ./pages .
COPY ./public .
COPY ./package.json .


RUN  npm install --omit=dev

# Expose the port to which the app is binding to
EXPOSE 8080

# Specifiy the command to run at start of server
CMD ["npm run", "dev"]