const express = require("express");
const path = require("path"); // Asegúrate de incluir el módulo 'path'
const http = require("http");
// const config = require("config");
const pg = require("pg");
const bd = "postgres://johan:6kFs5GDYo9pDt4zDXmONeTCD3xkrX4cz@dpg-cmo5d7un7f5s73d31vj0-a/crud_nodejs_db";

// config();

const app = express();
const pool = new pg.Pool({
  connectionString: bd,
  // ssl: true,
});

// Llamamos al motor de plantillas
app.set("view engine", "ejs");
// explicamos como vamos a capturar los datos de la vista
app.use(express.urlencoded({ extended: false }));
// le decimos que vamos a trabajar con json
app.use(express.json());

// app.use("/", require("./router"));

app.get("/", (req, res) => {
  res.render("create.ejs");
  // conexion.query("SELECT * FROM users", (err, results) => {
  //   res.render("index.ejs", { results: results.recordset });
  // });
});
app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  return res.json(result.rows[0]);
});

// ruta para crear registros
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

// para guardar los datos
const crud = require("./controllers/crud");
// traemos a los metodos que usaremos
app.post("/save", crud.save, (req, res) => {
  // esto se ejecutará después de que crud.save responda
  console.log(res.body);
});

const asignarPuertoAutomático = () => {
  const puertoInicial = 3000;
  const puertoFinal = 4000;

  function intentarAsignarPuerto(puerto) {
    const server = http.createServer(app);

    server.listen(puerto, () => {
      console.log(`Server CORRIENDO EN PUERTO : http://localhost:${puerto}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.log(`Puerto ${puerto} en uso, probando el siguiente.`);
        server.close();
        intentarAsignarPuerto(puerto + 1);
      } else {
        console.error("Error al intentar asignar el puerto:", error.message);
      }
    });
  }

  intentarAsignarPuerto(puertoInicial);
};
asignarPuertoAutomático();
