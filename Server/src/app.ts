import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './database'


// Create a new express application instance
const app: express.Application = express();

// Pptions for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "http://localhost:4500",
  preflightContinue: false,
};

//use cors middleware
app.use(cors(options));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/note', function(req,res) {
  console.log(res);
  let x = {test: "random"};
  res.status(200).json("L, did you know Shinigami love apples?");
});

app.get('dataupload', function(req,res){
  
});

const port: Number = Number(process.env.PORT) || 4000;
const startServer = async () => {
  await app.listen(port, () => {
    console.log(`This Server is running on http://localhost:4000
`);
  });
};
(async () => {
  await connectDB();
  await startServer();
})();
