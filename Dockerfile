FROM node:10 AS ts-sabroso-api
WORKDIR /app
COPY . .
RUN npm install
RUN npm run clean
RUN npm run build 

FROM node:10-alpine AS ts-sabroso-api-prod
WORKDIR /app
COPY --from=ts-sabroso-api ./app/build ./build
COPY package*.json ./
COPY .env.example ./
RUN mv .env.example .env
RUN npm install --production
CMD npm start