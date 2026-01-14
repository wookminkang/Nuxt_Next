FROM node:20.18.2-bullseye

WORKDIR /app

COPY /.output /app/.output

EXPOSE 80

ENV PORT=80

CMD ["node", ".output/server/index.mjs"]