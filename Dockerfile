FROM node:20-alpine3.17

COPY . /app

RUN cd /app && npm install

WORKDIR /app/back

CMD npm run prod