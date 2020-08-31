FROM mysql:5.7.31

ENV MYSQL_ROOT_PASSWORD secret
ENV MYSQL_DATABASE the_agile_monkeys_api_test

COPY init_db.sql /docker-entrypoint-initdb.d/