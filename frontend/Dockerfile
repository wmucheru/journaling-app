# Build stage
FROM node:23.4.0-bookworm-slim AS builder
LABEL stage=builder

WORKDIR /app

COPY package.json ./
RUN npm install -g npm && npm install --force
COPY . .
RUN npm run build

# Build runner image
FROM node:23.4.0-bookworm-slim AS runner
ENV NODE_ENV=production

WORKDIR /app

RUN npm i -D @next/swc-linux-x64-gnu --save-optional

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json .
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]