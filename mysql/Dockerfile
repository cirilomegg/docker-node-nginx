FROM mysql:5.7.15

ENV MYSQL_DATABASE=nodedb \
    MYSQL_ROOT_PASSWORD=root

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306

RUN ["echo", "innodb_use_native_aio=0"]
