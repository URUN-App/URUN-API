FROM node:18-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD [ "node", "bin/www" ]