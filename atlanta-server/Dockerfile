FROM node:10

WORKDIR /atlanta-server

COPY *.js .
COPY package*.json ./
COPY ./apis ./apis
COPY ./models ./models
COPY config.prod.json config.json

RUN npm ci --only production

EXPOSE 3001

ENTRYPOINT ["node", "index.js"]
