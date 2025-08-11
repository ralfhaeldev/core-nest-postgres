# 1. Install dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false --network-timeout 900000

# 2. Build the app
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# 3. Production runner
FROM node:22-alpine AS runner
WORKDIR /usr/src/app

# Copiar solo package.json para instalar prod deps
COPY package.json yarn.lock ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY .env .env

CMD ["node", "dist/main"]
