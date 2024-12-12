FROM node:lts-alpine AS build-stage

LABEL maintainer="husky"

WORKDIR /project/big-event-webcode

COPY . .

RUN yarn install

RUN yarn build

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /project/big-event-webcode/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]