FROM nginx:stable

LABEL MAINTAINER="Wangyiting"
LABEL image.function="game for openeuler"

COPY  . /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html/

RUN chown -R nginx:nginx /usr/share/nginx/html

ENV RUN_USER nginx
ENV RUN_GROUP nginx

EXPOSE 80

ENTRYPOINT nginx -g "daemon off;"