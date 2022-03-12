
//Configure connection to sql server
const sqlConfig = {
  server: 'localhost',
  port: 2224,
  user: "sa",
  password: "CkdKDf#ievNdalcsq@dfs",
  database: "aseni",
  pool: {
    max: 3,
    min: 1,
    idleTimeoutMillis: 30000
  },
  options: {
    trustServerCertificate: true, // local development
    enableArithAbort: true
  }
}

export { sqlConfig as sqlConfig };

