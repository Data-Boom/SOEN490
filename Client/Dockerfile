# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /home/node/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add dependency list
ADD package*.json ./

# install app dependencies
RUN npm install

# set user inside container
USER node

# open port for IO
EXPOSE 4500

# add app
COPY . ./

# start app
CMD ["npm", "start"] 