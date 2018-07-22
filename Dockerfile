FROM node:8

ADD ./ ~/ainetwork
WORKDIR ~/ainetwork

RUN npm install -g yarn
RUN yarn install

EXPOSE 8080

CMD ["yarn", "serve"]