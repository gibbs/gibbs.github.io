FROM node:24-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates && \
	npm install

COPY ./src /app

ENV WRANGLER_SEND_METRICS=false

EXPOSE 8787

CMD ["npx", "wrangler", "dev", "--ip", "0.0.0.0", "--port", "8787"]
