//Importar para Sql server
const sql = require('mssql');
import {sqlConfig} from "./dbconfig"

async function getCantones() {
	try {
		// make sure that any items are correctly URL encoded in the connection string
		let pool = await sql.connect(sqlConfig)//sql config esta dbconfig.ts
		let result =  await pool.request().query('select * from cantons')
		
		//return result
		console.log(result)
	} catch (err) {
		console.log(err)
	}
}

//getCantones()
//module.exports = { getCantones : getCantones}