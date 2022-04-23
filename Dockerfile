FROM node:16.14 AS build
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --only=production
COPY . .

FROM node:alpine
RUN apk add vim
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
EXPOSE 3333
CMD [ "npm", "run", "start-docker" ]