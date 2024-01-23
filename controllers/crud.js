exports.save = (req, res) => {
  const nombre = req.body.nombre;
  const rol = req.body.rol;
  console.log(req.body);
  console.log(nombre + " --" + rol);
  res.send("Datos guardados");
};
