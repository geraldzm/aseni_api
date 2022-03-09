
//Configure connection to sql server
/*const sqlConfig = {
  server: '192.168.0.11',
  port: 2223,
  user: "niko",
  password: "sCVa#sdfD324a",
  database: "aseni",
  options: {
    trustServerCertificate: true,
    enableArithAbort: true
  }
}*/
const sqlConfig = {
  server: 'NIKOF',
  port: 1433,
  user: "sa",
  password: "admin",
  database: "pruebas",
  options: {
    trustServerCertificate: true,
    enableArithAbort: true
  }
}

export { sqlConfig as sqlConfig };

