const express = require("express");
const router = express.Router();
const pool = require("./database/db");
const usuariosController = require("./controllers/usuarioController");//usamos los controladores que creamos

// capturamos los datos de la url
router.use(express.urlencoded({ extended: false }));
// para que reconosca todos lo json
router.use(express.json());

// todo eso de arriba debe estar antes de las rutas

router.get("/", async (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query("SELECT * FROM usuarios", (err, results) => {
      res.render("index.ejs", { results: results });
    });
  });
});

router.get("/create", async (req, res) => {
  res.render("create.ejs");
});

router.post("/guardar", usuariosController.guardarUsuario);//usamos los controllers 

// manejar error 404
router.use((req, res) => {
  res.status(404).render("404.ejs");
});

module.exports = router;
