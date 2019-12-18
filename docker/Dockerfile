FROM node:12-stretch-slim
ENV NODE_ENV development
WORKDIR /usr/src
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --silent && mv node_modules ../
RUN yarn global add @adonisjs/cli --dir /usr/local
COPY . .
EXPOSE 3333
CMD ["sh", "-c", "yarn install && yarn start:dev"]
