
//Configure connection to sql server
const sqlConfig = {
  server: '192.168.0.11',
  port: 2224,
  user: "sa",
  password: "sCVa#sdfD324a",
  database: "aseni",
  options: {
    trustServerCertificate: true,
    enableArithAbort: true
  }
}

export { sqlConfig as sqlConfig };

