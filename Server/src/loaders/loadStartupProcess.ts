import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from '../database'
const datasetController = require('../controllers/DatasetController')
import { fileUploadRouter } from '../routes/fileUploadRouter'
const bodyParser = require('body-parser');

/**
 * This class contains complete startup procedure of the application. These settings are loaded only once and used
 * to initialize the application. The initial connection to the database is also created here.
 */
class loadStartupProcess {
  constructor() {

    // Create a new express application instance
    const app: express.Application = express();

    /**
     *  Options for cors midddleware. These HTTP headers can be configured what the application requires. Will be modified in 
     * the future.
     */
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
      extended: false
    }));
    app.use(cors(options));
    app.use(bodyParser.json());


    /**
     * Routes are added/loaded to the application here. All routes can be added following the style of fileUploadRouter
     */
    app.use('/', datasetController)
    app.use('/', fileUploadRouter)


    /**
     * The following starts the server on port 4000 
     */
    const port: Number = Number(process.env.PORT) || 4000;
    const startServer = async () => {
      await app.listen(port, () => {
        console.log(`This Server is running on http://localhost:4000`);
      });
    };

    /**
     * Call the connect method from /Database to connect to the database and starts the nodejs Server
     */
    (async () => {
      await connectDB();
      await startServer();
    })();

  }
}

module.exports = loadStartupProcess;