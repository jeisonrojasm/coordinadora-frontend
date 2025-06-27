FROM node:20-alpine

WORKDIR /app

# Copiar e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código (será sobrescrito por volumen en dev)
COPY . .

EXPOSE 5173

# El flag --host permite acceder a la app desde fuera del contenedor (obligatorio en Docker).
CMD ["npm", "run", "dev", "--", "--host"]