const express = require("express");
const router = express.Router();
const pool = require("./database/db");

router.get("/", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al obtener la conexión");
    }

    connection.query("SELECT * FROM usuarios", (err, results) => {
      connection.release(); // Liberar la conexión después de la consulta
      if (err) {
        console.error(err);
        return res.status(500).send("Error en la consulta");
      }

      res.json(results);
    });
  });
});

router.get("/ping", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al obtener la conexión");
    }

    connection.query("SELECT NOW()", (err, results) => {
      connection.release(); // Liberar la conexión después de la consulta
      if (err) {
        console.error(err);
        return res.status(500).send("Error en la consulta");
      }

      res.json(results[0]);
    });
  });
});

// Otras rutas...

module.exports = router;
