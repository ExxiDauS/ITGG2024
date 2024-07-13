FROM node:lts-alpine
ARG DEBIAN_FRONTEND=noninteractive
WORKDIR /ITGG
copy . .
RUN apk add --no-cache tzdata
RUN npm install && npm run build
EXPOSE 3000
ENV TZ Asia/Bangkok
ENV NODE_ENV=production
CMD ["node", "build"]
