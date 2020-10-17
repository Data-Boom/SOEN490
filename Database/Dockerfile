# Pull official mySQL Image
FROM mysql:5.7

# Set working Dir
WORKDIR /

# Open Port
EXPOSE 3300

# Add Env Variables
ENV MYSQL_USER: 'user'
ENV MYSQL_PASSWORD: 'password'
ENV MYSQL_ROOT_PASSWORD: 'password'

COPY . /docker-entrypoint-initdb.d/
