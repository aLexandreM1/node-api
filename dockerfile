FROM node:10.16.2-stretch

WORKDIR /usr/src/app

ENV NODE_ENV production

# Install Node.js dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copy Node.js files
COPY * /usr/src/

# Expose port 8080 and start Node.js server
EXPOSE 8080
CMD ["npm", "src/main/index.js"]