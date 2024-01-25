const express = require("express");
const router = express.Router();
const usuariosController = require("./controllers/usuarioController"); //usamos los controladores que creamos

// capturamos los datos de la url
router.use(express.urlencoded({ extended: false }));
// para que reconosca todos lo json
router.use(express.json());
// todo eso de arriba debe estar antes de las rutas

router.get("/", usuariosController.mostrarUsuarios);

// para guardar los datos
router.get("/create", (req, res) => {
  res.render("create.ejs");
});

// ruta para editar usuario
router.get("/edit/:id", usuariosController.editarUsuario);

// ruta para borrar usuario por id
// router.delete("/:id", usuariosController.borrarUsuario);
router.get("/delete/:id", usuariosController.borrarUsuario);

router.post("/guardar", usuariosController.guardarUsuario); //usamos los controllers
router.post("/actualizar", usuariosController.actualizarUsuario);

// manejar error 404
router.use((req, res) => {
  res.status(404).render("404.ejs");
});

module.exports = router;
