import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from '../database'
const datasetController = require('../controllers/DatasetController')
const fileUploadRouter = require('../routes/FileUploadRouter');

const bodyParser = require('body-parser');


class loadStartupProcess {
    constructor() {

// Create a new express application instance
const app: express.Application = express();

// Options for cors midddleware
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
app.use(cors(options));
app.use('/', datasetController)
app.use('/', fileUploadRouter)

const port: Number = Number(process.env.PORT) || 4000;
const startServer = async () => {
  await app.listen(port, () => {
    console.log(`This Server is running on http://localhost:4000`);
  });
};

(async () => {
  await connectDB();
  await startServer();
})();

    }
}

module.exports = loadStartupProcess;