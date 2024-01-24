const express = require("express");
const router = express.Router();

const conexion = require("./database/db");

router.get("/", (req, res) => {
  res.render("create.ejs");
  // conexion.query("SELECT * FROM users", (err, results) => {
  //   res.render("index.ejs", { results: results.recordset });
  // });
});

// ruta para crear registros
router.get("/create", (req, res) => {
  res.render("create.ejs");
});

// para guardar los datos
const crud = require("./controllers/crud");
// traemos a los metodos que usaremos
router.post("/save", crud.save, (req, res) => {
  // esto se ejecutará después de que crud.save responda
  console.log(res.body);
});

module.exports = router;
