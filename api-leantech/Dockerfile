FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME [ "/app/node_modules" ]

CMD ["npm","start"]
