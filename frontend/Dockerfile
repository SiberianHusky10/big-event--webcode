FROM node:lts-alpine as build-stage

MAINTAINER husky

WORKDIR /project/big-event-webcode

COPY package*.json ./

RUN npm install

COPY frontend .

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /project/big-event-webcode/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# RUN rm /etc/nginx/conf.d/default.conf

# ADD default.conf /etc/nginx/conf.d/

# COPY dist/ /usr/share/nginx/html/
