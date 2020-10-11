# SOEN490

### How to setup Development Environment:
#### Note: This is not yet complete 

#### Step 1: Clone the Repo into directory of choice
#### Step 2: Install Docker for your OS from https://docs.docker.com/get-docker/
#### Step 3: Start Docker
#### Step 4: Change into your project directory -> Server and run NPM install
#### Step 5: Go back one directory level -> Client and run NPM install
#### Step 6: Go back one directory level and make sure you see docker-compose.yml file & run docker-compose up -d
#### Step 7: Navigate to localhost:4000 to find backend & localhost:4500 for frontend. You can test with the endpoint localhost:4500/note to see the connection to backend

### Other Docker Notes for DB
#### docker-compose command will also bring up a MySQL Database. To connect you can either use sequelize (NA for now), mySQL command line or db connector such as mySQLWorkBench. Mac users need to make sure to save PW to keychain for access. If connected by CLI or Tool, tables can be modified directly using MYSQL language.
#### If the docker env is heavy for your machine or you don't require db access for development of your feature, you can exclude the startup of the DB by commenting out the db service block in the docker-compose.yml file (Then the first service is the backend service)
#### If DB needs to be completely wiped and re-seeded (with new init.sql), you need to delete the my-sql directory under /Database


### Common Docker Commands you will need:
#### docker-compose up -d -> This will start build and run the front & backend in containers
#### docker-compose logs -> Allows you to check logs
#### docker-compose down -> This will shut down your containers
#### docker-compose down -v -> If you need to wipe the saved data (frontend/backend/db) and shut down

