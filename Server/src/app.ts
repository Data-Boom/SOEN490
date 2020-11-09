import 'dotenv/config';
const loadStartupProcess =  require('./loaders/loadStartupProcess');


/**
 * App.ts should be kept to a minimal, only items required by the whole application should reside here. Startup
 * processes were  moved as they only require a one-time call
 */
const expressLoader = new loadStartupProcess();

