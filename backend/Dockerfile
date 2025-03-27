FROM node:23.4.0-bookworm-slim

WORKDIR /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

# Restarting container after a crash requires node js app to be started
# using node itself: `node index.js`
#
# https://pascal-bergeron.com/en/posts/restart-docker-container-after-crash/
#
CMD ["node", "index.js"]