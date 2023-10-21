FROM node:latest
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
EXPOSE 5137
CMD ["npm", "start"]