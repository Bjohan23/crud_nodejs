const express = require("express");
const router = express.Router();

const conexion = require("./database/db");
const { pool } = require("./app");

router.get("/", (req, res) => {
  res.render("create.ejs");
  // conexion.query("SELECT * FROM users", (err, results) => {
  //   res.render("index.ejs", { results: results.recordset });
  // });
});
router.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  return res.json(result.rows[0]);
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
