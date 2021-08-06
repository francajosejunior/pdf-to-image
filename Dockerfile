# francajosejunior/node-ghostscript

FROM node:14 as base

WORKDIR /usr/src/app
COPY package*.json ./
EXPOSE 3232
COPY . .
RUN chmod +x ./bootstrap.sh
RUN ./bootstrap.sh


FROM base as dev
RUN npm install -g nodemon
ENV NODE_ENV=development
RUN npm install
CMD [ "nodemon", "src/index.js" ]

FROM base as test
RUN npm install
CMD [ "npm", "test" ]


FROM base as production
ENV NODE_ENV=production
RUN npm install
CMD [ "node", "src/index.js" ]
