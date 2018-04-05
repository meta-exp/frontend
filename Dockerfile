FROM node:carbon as build
ARG api_host

# Create app directory
WORKDIR /usr/src/pika

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY pika/package*.json ./

# If you are building your code for development:
# RUN npm install
# If you are building your code for production:
RUN yarn install --only=production

RUN yarn add graph-app-kit --registry https://neo.jfrog.io/neo/api/npm/npm


# Bundle app source
COPY pika/ .

RUN REACT_APP_API_HOST=$api_host npm run build

####### Serve site
FROM nginx

# Remove default website files
RUN rm -rf /usr/share/nginx/html/*

COPY deployment/default.conf /etc/nginx/conf.d/
COPY --from=build /usr/src/pika/build/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
