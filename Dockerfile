FROM node:12-alpine3.9
WORKDIR /app
COPY . ./
RUN npm install
CMD ["node", "example.js"]
