import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Logger } from '../common';
import {consultrouter} from './consultsrouter';

class Routes {

    public express: express.Application;
    public logger: Logger;

    constructor() {
        this.express = express();
        this.logger = new Logger();

        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/consults', consultrouter);
        
        this.logger.info("route loaded");
    }
}

export default new Routes().express;

