# FROM francajosejunior/node-ghostscript

FROM node:14  
COPY ./bootstrap.sh ./bootstrap.sh
RUN chmod +x ./bootstrap.sh
RUN ./bootstrap.sh 

WORKDIR /usr/src/app
COPY package*.json ./ 

COPY . .

RUN npm install -g nodemon
RUN npm install
