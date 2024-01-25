const pool = require("../database/db");

const usuariosController = {
  guardarUsuario: (req, res) => {
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let registrar = `INSERT INTO usuarios (nombre, apellido) VALUES ('${nombre}', '${apellido}')`;
    pool.query(registrar, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al insertar datos en la base de datos");
      } else {
        res.redirect("/");
      }
    });
  },

  mostrarUsuarios: async (req, res) => {
    pool.getConnection((err, connection) => {
      connection.query("SELECT * FROM usuarios", (err, results) => {
        res.render("index.ejs", { results: results });
        connection.release(); // Devolver la conexión al pool
      });
    });
  },

  borrarUsuario: (req, res) => {
    let id = req.params.id;
    let borrar = `DELETE FROM usuarios WHERE id = ${id}`;
    pool.query(borrar, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al insertar datos en la base de datos");
      } else {
        res.redirect("/");
      }
    });
  },
  editarUsuario: (req, res) => {
    let id = req.params.id;
    let editar = `SELECT * FROM usuarios WHERE id = ${id}`;
    pool.query(editar, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al insertar datos en la base de datos");
      } else {
        res.render("edit.ejs", { user: results[0] });
      }
    });
  },

  borrarUsuario: (req, res) => {
    let id = req.params.id;
    let borrar = `DELETE FROM usuarios WHERE id = ${id}`;
    pool.query(borrar, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al insertar datos en la base de datos");
      } else {
        res.redirect("/");
      }
    });
  },
  actualizarUsuario: (req, res) => {
    const id = req.params.id;
    const nombre= req.body.nombre;
    const apellido= req.body.apellido;
    const datos={
      nombre: nombre,
      apellido: apellido,
      id : id
    }
    console.log(datos)
    // actualizar 
    // let actualizar ='UPDATE usuarios SET ? WHERE id = ?', [{nombre1:nombre, apellido1: apellido}, id];
    // let actualizar = `UPDATE usuarios SET nombre = '${nombre}', apellido = '${apellido}' WHERE id = ${id }`;
    pool.query('UPDATE usuarios SET ? WHERE id = ?', [datos, id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al insertar datos en la bd");
      } else {
        res.redirect("/");
      }
    });
  },
};

module.exports = usuariosController;
