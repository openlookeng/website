FROM nginx

MAINTAINER Edward Lee <freesky.edward@gmail.com>

RUN apt-get update && \
    apt install curl -y && \
    apt-get install git -y


ENV HUGO_VERSION=0.73.0

RUN mkdir -p /usr/local/src && \
    cd /usr/local/src && \
    curl -L https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz | tar -xz && \
    mv hugo /usr/local/bin/

RUN mkdir -p /src/website/
COPY . /src/website/


RUN cd /src/website/ && \
    /usr/local/bin/hugo -b / && \
    cp -rf /src/website/public/* /usr/share/nginx/html/ && \
    chmod -R 755 /usr/share/nginx/html 

ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"