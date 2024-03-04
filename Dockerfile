FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm install && npm run build:es

FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder /app/out/ ./out/
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev --ignore-scripts 

ENV REMED_DB=${REMED_DB}
ENV BILL_IN_DB=${BILL_IN_DB}
ENV LMDB_KEY=${LMDB_KEY}


EXPOSE 3000

CMD ["node", "./out/index.js"]