FROM node:carbon

# Create app directory
WORKDIR /usr/src/pika

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY pika/package*.json ./

# If you are building your code for development
# RUN npm install
RUN npm install --only=production

# Bundle app source
COPY pika/ .

RUN npm run build

RUN npm install -g serve

EXPOSE 80
CMD [ "serve", "-s", "pika/build", "-p", "80" ]
