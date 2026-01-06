# ETAPE 1 : On construit le site React
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ETAPE 2 : On sert le site avec Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Attention : react-scripts crée le dossier 'build'
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#