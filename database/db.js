const sql = require("mssql");

const config = {
  user: "johan",
  password: "230803",
  server: "localhost",
  database: "crud_nodejs_db",
  options: {
    encrypt: false, // Dependiendo de tu configuración
    trustServerCertificate: true, // Dependiendo de tu configuración
  },
};

sql.connect(config)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.error("Error de conexión a la base de datos:", error);
  });

module.exports = sql;
