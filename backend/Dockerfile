FROM node:16.20.2-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
# CMD ["node", "server.js"]
CMD ["npm", "start"]