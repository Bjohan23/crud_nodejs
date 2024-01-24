const sql = require("mysql2");

const host = "viaduct.proxy.rlwy.net";
const user = "root";
const password = "g4GG56DhGHG23AdHd6hdH5BHg4DHGaEA";
const database = "railway";
const port = 31803;

const pool = sql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to MySQL server as id " + connection.threadId);
});

module.exports = pool;
