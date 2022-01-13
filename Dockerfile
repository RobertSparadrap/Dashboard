FROM node:14

WORKDIR /usr/src/app

#Install app dependencies
COPY package*.json ./
RUN npm install

#bundle
COPY . .

EXPOSE 8080

CMD ["npm", "start"]