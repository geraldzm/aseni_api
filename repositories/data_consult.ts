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

    public query6(user: number,plan: number,list: any): Promise<any> {
        let insert = '';
		try {
			list.forEach(function(element: number, index: number, array: any) {
				let next = index+1
				if((next % 2) != 0) {
					insert += '('+element+','+list[next]+'),';
				}
				if(next == list.length-1) {
					throw 'Break';;
				}
			})
		} catch (e) {
			if (e !== 'Break') throw e
		}
		insert =  insert.substring(0, insert.length - 1)
       
        return app.locals.db.query(
            'DECLARE @tvp AS EntregableTVP '+
            'INSERT INTO @tvp '+
            'Values '+insert+' '+
		    'Exec query6 '+user+', '+plan+',@tvp'
            );
    }
}

