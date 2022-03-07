import { Logger } from '../common'

//Sql server
const sql = require('mssql');
import {sqlConfig} from "../DB/dbconfig"
//Sql server


export class ConsultController {
    private static instance: ConsultController;
    private log: Logger;

    private constructor()
    {
        this.log = new Logger();
        try
        {
        } catch (e)
        {
            this.log.error(e);
        }
    }

    public static getInstance() : ConsultController
    {
        if (!this.instance)
        {
            this.instance = new ConsultController();
        }
        return this.instance;
    }

    public async getCantones()
    {
        try {
            // make sure that any items are correctly URL encoded in the connection string
            let pool =  await sql.connect(sqlConfig)//sql config esta dbconfig.ts
            let result =  await pool.request().query('select * from cantons')
            return result
            //console.log(result)
        } catch (err) {
            console.log(err)
        }
    }

}
