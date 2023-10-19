FROM node:latest
WORKDIR /app
COPY address-service/package*.json ./
RUN npm ci
COPY address-service/. .
CMD ["npm", "start"]
EXPOSE 8080

# FROM nginx
# COPY --from=build /app/build /usr/share/nginx/html
# # to make react-router work with nginx
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 8080
# CMD ["nginx", "-g", "daemon off;"] 