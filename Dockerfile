FROM node:14-alpine as build

WORKDIR /

COPY . /

RUN npm ci \
	&& npm run build \
	&& npm prune --production \
	&& npm install express -D


FROM node:14-alpine

ENV NODE_ENV=production
USER node
WORKDIR /

COPY --from=build /package*.json /
COPY --from=build /node_modules/ /node_modules/
COPY --from=build /dist/ /dist/
COPY --from=build /server.js /server.js

EXPOSE 3000

CMD ["npm", "run", "start:prod"]





# FROM node:14.17.6-alpine
# WORKDIR /
# COPY . .
# RUN npm i
# CMD npm run start
