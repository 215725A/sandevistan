FROM node:16.20.2-alpine
WORKDIR /usr/app
COPY package*.json ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm install styled-components
RUN npm run build
COPY . .
EXPOSE 3000
CMD ["npm", "start"]