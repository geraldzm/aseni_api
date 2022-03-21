const sql = require('mssql')
import {sqlConfig} from "./DB/dbconfig"
import App from './app';
import * as  http from 'http'
import { Logger } from './common'

const port = 5000;
const logger = new Logger();

//instantiate a connection pool
const appPool = new sql.ConnectionPool(sqlConfig);


//connect the pool and start the web server when done
appPool.connect().then(function(pool: any) {
    logger.info('conneciton pool created');
    
    App.locals.db = pool;
    App.set('port', port);
    const server = http.createServer(App);
    server.listen(port);

    server.on('listening', () => {
        const addr = server.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        logger.info(`Listening on ${bind}`)
    });

}).catch(function(err: any) {
    console.error('Error creating connection pool', err)
});


module.exports = App;