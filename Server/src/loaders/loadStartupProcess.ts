import 'dotenv/config';
import 'cookie-parser'

import { authenticationRouter } from '../routes/authenticationRouter';
import bodyParser from 'body-parser'
import { connectDB } from '../database';
import cors from 'cors';
import express from 'express';
import { fetchAllCategoriesMaterialsRouter } from '../routes/fetchAllCategoriesMaterialsRouter';
import { dataExtractionRouter } from '../routes/dataExtractionRouter'
import { dataUploadRouter } from '../routes/dataUploadRouter'
import { getDataRouter } from '../routes/getDatasetRouter';
import { getConnectionManager } from 'typeorm';

const cookieParser = require('cookie-parser');

/**
 * This class contains complete startup procedure of the application. These settings are loaded only once and used
 * to initialize the application. The initial connection to the database is also created here.
 */
export class LoadStartupProcess {
  private app: express.Application;
  private config: any;
  private server: any;
  private port: Number;

  constructor() {

    // Create a new express application instance
    this.app = express();

    this.app.use(cookieParser());

    this.app.disable("x-powered-by"); //disable HTTP header to not disclose technology used on the website. (fingerprint hiding)

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
      origin: "http://localhost:3000",
      preflightContinue: false,
    };

    this.app.use(bodyParser.urlencoded({
      extended: false
    }));
    this.app.use(cors(options));
    this.app.use(bodyParser.json());


    /**
     * Routes are added/loaded to the application here. All routes can be added following the style of fileUploadRouter
     */
    this.app.use('/', dataExtractionRouter)
    this.app.use('/', authenticationRouter)
    this.app.use('/', getDataRouter)
    this.app.use('/', fetchAllCategoriesMaterialsRouter)
    this.app.use('/', dataUploadRouter)

    this.config = {
      "type": process.env.DB_TYPE,
      "host": process.env.HOST,
      "port": process.env.DB_PORT,
      "username": process.env.USER_NAME,
      "password": process.env.PASSWORD,
      "database": process.env.DB_NAME,
      "synchronize": false,
      "logging": true,
      "entities": [
        "src/models/entities/**/*.ts",
        "dist/entities/**/*.js"
      ]
    }

    /**
     * The following starts the server on port 4000 
     */
    this.port = Number(process.env.PORT)
    this.server = async () => {
    };

    /**
     * Call the connect method from /Database to connect to the database and starts the nodejs Server
     */
    (async () => {
      try {
        await connectDB(this.config);
      } catch (error) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (error.name === "AlreadyHasActiveConnectionError") {
          const existentConn = getConnectionManager().get("default");
          return existentConn;
        }
        console.log("caught error while connecting to db:")
        console.log(error)
      }
      await this.server();
    })();

  }

  getServer() {
    return this.server;
  }

  getApp() {
    return this.app;
  }

  getPort() {
    return this.port;
  }
}
