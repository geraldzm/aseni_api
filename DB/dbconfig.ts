
//Configure connection to sql server
const sqlConfig = {
  server: '192.168.0.11',
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

