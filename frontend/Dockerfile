FROM node:16.15.0-alpine as build

WORKDIR /app

EXPOSE 3000

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm run start

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY /../nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]