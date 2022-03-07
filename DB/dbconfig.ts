
//Configure connection to sql server
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

