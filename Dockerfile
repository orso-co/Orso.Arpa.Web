# Legobausatz in der Ecke
FROM node:18-alpine AS builder

USER node
WORKDIR /home/node

ADD --chown=node:node ./package.json .
ADD --chown=node:node ./package-lock.json .

RUN npm install --legacy-peer-deps

ADD --chown=node:node . .

# RUN npx ng build --configuration dev
RUN npx ng build

# ab ins Schaufenster
FROM nginx:1.21.6-alpine

COPY --from=builder /home/node/dist/Orso-Arpa-Web /usr/share/nginx/html
