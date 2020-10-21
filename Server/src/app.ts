import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './database'
const datasetController = require('./controllers/DatasetController')
const bodyParser = require('body-parser');

// Create a new express application instance
const app: express.Application = express();
const Parser = require('csv-parse');
const Multer = require('multer');
const fileSystem = require('fs');

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
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//use cors middleware
// app.use(cors(options));
app.use('/', datasetController)

app.get('/note', function(req,res) {
  console.log(res);
  let x = {test: "random"};
  res.status(200).json("L, did you know Shinigami love apples?");
});

function parseCSVFile(sourceFilePath, columns, onNewRecord, handleError, done){
  var source = fileSystem.createReadStream(sourceFilePath);

  var linesRead = 0;

  var parser = Parser({
      delimiter: ',', 
      columns:columns
  });

  parser.on("readable", function(){
      var record;
      while (record = parser.read()) {
          linesRead++;
          onNewRecord(record);
      }
  });

  parser.on("error", function(error){
      handleError(error)
  });

  parser.on("end", function(){
      done(linesRead);
  });

  source.pipe(parser);
}

//We will call this once Multer's middleware processed the request
//and stored file in req.files.fileFormFieldName

function parseFile(req, res, next){
  var filePath = req.files.file.path;
  console.log(filePath);
  function onNewRecord(record){
      console.log(record)
  }

  function onError(error){
      console.log(error)
  }

  function done(linesRead){
      res.send(200, linesRead)
  }

  var columns = true; 
  parseCSVFile(filePath, columns, onNewRecord, onError, done);
}

//this is the route handler with two middlewares. 
//First:  Multer middleware to download file. At some point,
//this middleware calls next() so process continues on to next middleware
//Second: use the file as you need
// app.post('/upload', [Multer({dest:'./uploads'}), parseFile]);



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