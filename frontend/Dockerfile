FROM node:16.20.2-alpine
WORKDIR /usr/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]