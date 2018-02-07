FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY pika/package*.json ./

# If you are building your code for development
# RUN npm install
RUN npm install --only=production

RUN npm run build

# Bundle app source
COPY . .

RUN npm install -g serve

EXPOSE 80
CMD [ "serve", "-s", "pika/build", "-p", "80" ]
