# Use "node:16.8" or "node:lts" as the base image
FROM node:16.8 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.8 as production

WORKDIR /app
COPY --from=build /app/next.config.js ./
COPY --from=build /app/package*.json ./
RUN npm install --production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
# Copy the 'src' directory to the container
COPY --from=build /app/src ./src

EXPOSE 3000

CMD ["npm", "start"]
