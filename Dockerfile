FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build:es

FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder /app/out/ ./out/
COPY --from=builder /app/package*.json ./
COPY ./prisma ./

RUN npm ci --omit=dev --ignore-scripts 
RUN npx prisma generate

ENV REMED_DB=${REMED_DB}
ENV BILL_IN_DB=${BILL_IN_DB}
ENV LMDB_KEY=${LMDB_KEY}
ENV DATABASE_URL=${DATABASE_URL}

EXPOSE 3000

CMD ["node", "./out/index.js"]