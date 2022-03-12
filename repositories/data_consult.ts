const sql = require('mssql');
import {sqlConfig} from "../DB/dbconfig"

import { Logger } from '../common'
import e = require("express");


export class ConsultData {

    private log: Logger;

    public constructor()
    {
        this.log = new Logger();
    }


    public query1() : Promise<any> {
        return new Promise(async function(resolve, rejected) {
            try {

                var conection =  await sql.connect(sqlConfig);
                var result =  await conection.request().query('select * from qr1');

                resolve(result);

            } catch (err) {
                rejected(err);
            }
        });
    }

    
    public query2() : Promise<any> {
        return new Promise(async function(resolve, rejected) {
            try {

                var conection =  await sql.connect(sqlConfig);
                var result =  await conection.request().query('select * from qr2');

                resolve(result);

            } catch (err) {
                rejected(err);
            }
        });
    }


    public query3(words: string) : Promise<any>
    {
        this.log.info('fetching words: ' + words);

        return new Promise(async function(resolve, rejected) {
            try {

                var conection =  await sql.connect(sqlConfig);
                var result =  await conection.request().query('exec qr3 @words =' + words);

                resolve(result);

            } catch (err) {
                rejected(err);
            }
        });
    }

}
