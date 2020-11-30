FROM ubuntu:16.04 as builder

MAINTAINER Edward Lee <freesky.edward@gmail.com>

RUN apt -y update && apt -y install curl
COPY . /src/website/
ENV HUGO_VERSION=0.73.0
RUN mkdir -p /usr/local/src && \
    cd /usr/local/src && \
    curl -L https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz | tar -xz && \
    mv hugo /usr/local/bin/
RUN cd /src/website/ && hugo -b / --minify

FROM nginx:latest

COPY --from=builder /src/website/public/ /usr/share/nginx/html/
RUN chown nginx:nginx -R /usr/share/nginx/html
COPY ./deploy/nginx/default.conf /etc/nginx/conf.d/
ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
