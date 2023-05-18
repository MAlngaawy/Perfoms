FROM node:18.15.0-alpine3.17 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ARG DOCKER_ENV

ENV NODE_ENV=${DOCKER_ENV}

RUN if [ "$DOCKER_ENV" = "production" ]; then echo your NODE_ENV for Production is $NODE_ENV;  else echo your NODE_ENV for stage is $NODE_ENV; fi

RUN if [ "$DOCKER_ENV" = "production" ]; then npm run build:prod; else npm run build:stg; fi

FROM nginx:1.23.1-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]