FROM node:latest
WORKDIR /app
COPY user-service/package*.json ./
RUN npm ci
COPY user-service/. .
CMD ["npm", "run", "dev"]
EXPOSE 5000