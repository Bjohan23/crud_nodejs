const pool = require("../database/db");

const usuariosController = {
  guardarUsuario: async (req, res) => {
    try {
      let nombre = req.body.nombre;
      let apellido = req.body.apellido;

      let registrar = `INSERT INTO usuarios (nombre, apellido) VALUES ('${nombre}', '${apellido}')`;
      pool.getConnection((err, connection) => {
        if (err) {
          return res
            .status(500)
            .send("Error al obtener la conexión de la piscina");
        }
        connection.query(registrar, (error, results, fields) => {
          connection.release(); // Devolver la conexión al pool
          if (error) {
            return res
              .status(500)
              .send("Error al insertar datos en la base de datos");
          }
          res.redirect("/");
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },
};

module.exports = usuariosController;
