# francajosejunior/node-ghostscript

# FROM node:14 as base
FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
# EXPOSE 3232
COPY . .
RUN chmod +x ./bootstrap.sh
RUN ./bootstrap.sh
RUN npm install -g nodemon
RUN npm install


# FROM base as dev
# ENV NODE_ENV=development
# CMD [ "nodemon", "src/index.js" ]

# FROM base as test
# RUN npm install
# CMD [ "npm", "test" ]


# FROM base as production
# ENV NODE_ENV=production
# RUN npm install
# CMD [ "node", "src/index.js" ]
