# SOEN490

### How to setup Development Environment:
#### Note: This is not yet complete 

#### Step 1: Clone the Repo into directory of choice
#### Step 2: Install Docker for your OS from https://docs.docker.com/get-docker/
#### Step 3: Start Docker
#### Step 4: Change into your project directory -> Server and run NPM install
#### Step 5: Go back one directory level and change into Client -> run NPM install
#### Step 6: Go back one directory level and make sure you see docker-compose.yml file & run docker-compose up -d
#### Step 7: Navigate to localhost:4000 to find backend & localhost:4500 for frontend. You can test with the endpoint localhost:4500/note to see the connection to backend

### Common Docker Commands you will need:
#### docker-compose up -d -> This will start build and run the front & backend in containers
#### docker-compose down -> This will shut down your containers
#### docker-compose logs -> Allows you to check logs
