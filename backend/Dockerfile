# estágio de build
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./

# instala o devDependencies no estágio de build
RUN npm ci

COPY . .

RUN npm run generate
RUN npm run build

# Estágio final (imagem menor)
FROM node:20-alpine AS production

RUN apk add --no-cache openssl

WORKDIR /app

# copia apenas o necessário do estágio builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# remove apenas as devDependencies no estágio final
RUN npm prune --production

EXPOSE 8080

CMD ["npm", "start"]