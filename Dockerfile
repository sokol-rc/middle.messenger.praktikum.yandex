FROM node:14.17.6
WORKDIR /
COPY . .
RUN npm i
CMD npm run start
