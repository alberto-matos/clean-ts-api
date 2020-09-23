FROM node:12.18
WORKDIR /usr/dev/clean-node-api
COPY package.json .
RUN npm install --only=prod