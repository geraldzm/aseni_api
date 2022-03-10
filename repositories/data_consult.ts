
//Sql server
const sql = require('mssql');
import {sqlConfig} from "../DB/dbconfig"
//Sql server

export class consultData {

    public constructor(){}

    public testConec() : Promise<any>
    {
        const test = new Promise(async function(resolve, rejected) {
            try {
                // make sure that any items are correctly URL encoded in the connection string
                var conection =  await sql.connect(sqlConfig)//sql config esta dbconfig.ts
                var result =  await conection.request().query('select * from usrs')
                resolve(result.recordsets);
            } catch (err) {
                rejected(err);
            }
        });

        return test;
    }

    public query1F() : Promise<any>
    {
        const test = new Promise(async function(resolve, rejected) {
            try {
                // make sure that any items are correctly URL encoded in the connection string
                var conection =  await sql.connect(sqlConfig)//sql config esta dbconfig.ts
                var result =  await conection.request().query('select * from qr1')
                resolve(result.recordsets);
            } catch (err) {
                rejected(err);
            }
        });
        return test;
    }

    public query1S() : Promise<any>
    {
        const test = new Promise(async function(resolve, rejected) {
            try {
                // make sure that any items are correctly URL encoded in the connection string
                var conection =  await sql.connect(sqlConfig)//sql config esta dbconfig.ts
                var result =  await conection.request().query('select * from qr1Second')
                resolve(result.recordsets);
            } catch (err) {
                rejected(err);
            }
        });
        return test;
    }

    public query2() : Promise<any>
    {
        const test = new Promise(async function(resolve, rejected) {
            try {
                // make sure that any items are correctly URL encoded in the connection string
                var conection =  await sql.connect(sqlConfig)//sql config esta dbconfig.ts
                var result =  await conection.request().query('select * from qr2')
                resolve(result.recordsets);
            } catch (err) {
                rejected(err);
            }
        });
        
        return test;
    }
}