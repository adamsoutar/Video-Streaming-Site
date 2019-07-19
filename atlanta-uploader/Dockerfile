FROM node:10

WORKDIR /atlanta-uploader

COPY *.js .
COPY package*.json ./
COPY ./models ./models
COPY config.prod.json config.json

RUN npm ci --only production

EXPOSE 3002

ENTRYPOINT ["node", "index.js"]
