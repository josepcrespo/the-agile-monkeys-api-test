FROM mysql:5.7.31

ENV MYSQL_ROOT_PASSWORD secret
ENV MYSQL_DATABASE the_agile_monkeys_api_test

# If we needed to initialize the database, we could do it with the following command.
# But, we already handle the initialization from our Feathers app, using Sequelize.
# COPY init_db.sql /docker-entrypoint-initdb.d/