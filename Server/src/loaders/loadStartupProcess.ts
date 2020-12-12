import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from '../database';
import { fileUploadRouter } from '../routes/fileUploadRouter';
import { authenticationRouter } from '../routes/authenticationRouter';
import bodyParser from 'body-parser';


/**
 * This class contains complete startup procedure of the application. These settings are loaded only once and used
 * to initialize the application. The initial connection to the database is also created here.
 */
export class loadStartupProcess {
  public app: express.Application

  constructor() {

    // Create a new express application instance
    this.app = express();

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
      origin: "http://localhost:4500",
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
    this.app.use('/', fileUploadRouter)
    this.app.use('/', authenticationRouter)


    const config: any = {

      "type": process.env.DB_TYPE,
      "host": process.env.HOST,
      "port": process.env.DB_PORT,
      "username": process.env.USER_NAME,
      "password": process.env.PASSWORD,
      "database": process.env.DB_NAME,
      "synchronize": true,
      "logging": true,
      "entities": [
        "src/models/entities/**/*.ts",
        "dist/entities/**/*.js"
      ]
    }

    /**
     * The following starts the server on port 4000 
     */
    const port: number = Number(process.env.PORT)
    const startServer = async () => {
      this.app.listen(port, () => {
        console.log(`This Server is running on http://localhost:${process.env.PORT}`);

      });
    };

    /**
     * Call the connect method from /Database to connect to the database and starts the nodejs Server
     */
    (async () => {
      try {
        await connectDB(config);
      } catch (error) {
        console.log("caught error while connecting to db:")
        console.log(error)
      }
      await startServer();
    })();

  }
}
