FROM node:16 as build

ENV NODE_ENV=production 


WORKDIR /app
COPY . .
COPY package.json package-lock.json svelte.config.js ./
RUN npm run build 


FROM node:16-alpine3.15

WORKDIR /app
COPY --from=build /app .


EXPOSE 3000

CMD ["node", "./build/index.js"]