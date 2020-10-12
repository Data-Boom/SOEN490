# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /home/node/app

# add dependency list
ADD package*.json ./

# install app dependencies
RUN npm install

# set user inside container
USER root

# open port for IO
EXPOSE 4000

# add app
COPY . ./

# add Bash
RUN apk update && apk add bash

# start in dev mode
CMD ["npm", "run", "dev"]