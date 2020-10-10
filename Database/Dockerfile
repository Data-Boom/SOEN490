# Pull official mySQL Image
FROM mysql:5.7

# Set working Dir
WORKDIR /home

# Open Port
EXPOSE 3300

# Add Env Variables
ENV MYSQL_USER: 'user'
ENV MYSQL_PASSWORD: 'password'
ENV MYSQL_ROOT_PASSWORD: 'password'

COPY init.sql /docker-entrypoint-initdb.d/
