# SOEN490

### How to setup Development Environment:
#### Note: This is not yet complete 
##### We use a local .env containing all our env variables. To run our project, you must be given access to this .env through one of the contributors.
<br>

### Option 1

#### Step 1: Clone the Repo into directory of choice
#### Step 2: Change into your project directory inside the Server folder and run "NPM install"
#### Step 3: Go back one directory level and go inside the Client folder and run "NPM install"
#### Step 4: Insert the .env inside the Server folder.
#### Step 5: Run "npm run dev" inside Server folder (This will run the backend and connect to the database)
#### Step 6: Run "npm run ui" inside the Client (This step will open the frontend on localhost:3000)
<br>

### Option 2

#### Step 1: Clone the Repo into directory of choice
#### Step 2: Install Docker for your OS from https://docs.docker.com/get-docker/
#### Step 3: Start Docker
#### Step 4: Change into your project directory -> Server and run NPM install
#### Step 5: Insert the .env inside the Server folder.
#### Step 6: Go back one directory level -> Client and run NPM install
#### Step 7: Go back one directory level and make sure you see docker-compose.yml file & run docker-compose up -d
#### Step 8: Navigate to localhost:4000 to find backend & localhost:4500 for frontend. You can test with the endpoint localhost:4500/note to see the connection to backend
<br>

### Common Docker Commands you will need:
#### docker-compose up -d -> This will start build and run the front & backend in containers
#### docker-compose down -> This will shut down your containers
#### docker-compose down -v -> If you need to wipe the saved data (frontend/backend) and shut down
#### docker-compose logs -> Allows you to check logs
#### docker logs --follow (name of service) -> Lets you tail a specific service

