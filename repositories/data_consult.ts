import { Logger } from '../common'
import app from "../app";


export class ConsultData {

    private log: Logger;

    public constructor() {
        this.log = new Logger();
    }


    public query1(): Promise<any> {
        return app.locals.db.query('select * from qr1');
    }


    public query2(): Promise<any> {
        return app.locals.db.query('select * from qr2');
    }


    public query3(words: string): Promise<any> {
        this.log.info('fetching words: ' + words);
        return app.locals.db.query('exec qr3 @words =' + words);
    }

}

