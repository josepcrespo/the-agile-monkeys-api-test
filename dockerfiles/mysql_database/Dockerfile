FROM mysql:5.7.31

ENV MYSQL_ROOT_PASSWORD secret
ENV MYSQL_DATABASE the_agile_monkeys_crm_service

# If we needed to initialize the database, we could do it with the following command.
COPY init_db.sql /docker-entrypoint-initdb.d/