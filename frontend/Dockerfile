# build frontend
FROM node:25-alpine3.22 as builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# build nginx server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]