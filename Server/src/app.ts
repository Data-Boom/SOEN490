import 'dotenv/config';
import { loadStartupProcess } from './loaders/loadStartupProcess'

/**
 * This class contains complete startup procedure of the application. These settings are loaded only once and used
 * to initialize the application. The initial connection to the database is also created here.
 */

let startup = new loadStartupProcess();

let port = startup.getPort();
startup.getApp().listen(port, () => {
    console.log(`This Server is running on http://localhost:${process.env.PORT}`);
});


