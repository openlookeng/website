FROM nginx:stable

LABEL MAINTAINER="Ailong"
LABEL image.function="2021summary for opensourceways community"

COPY  . /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html/

RUN chown -R nginx:nginx /usr/share/nginx/html

RUN sed -i '21i location /zh/2021summary/ {\n alias /usr/share/nginx/html/; \n} ' /etc/nginx/conf.d/default.conf

ENV RUN_USER nginx
ENV RUN_GROUP nginxs

EXPOSE 80

ENTRYPOINT nginx -g "daemon off;"