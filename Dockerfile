FROM node:12.18
WORKDIR /usr/dev/clean-node-api
COPY package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start