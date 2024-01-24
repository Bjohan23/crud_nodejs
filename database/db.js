const sql = require("mysql2");

const pool = sql.createPool({
  host: "viaduct.proxy.rlwy.net",
  user: "root",
  password: "-61GHE-FHgG665gHEgc2HEFBEE2ceb--",
  database: "railway",
  port: 22598,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to MySQL server as id " + connection.threadId);
});

module.exports = pool;
