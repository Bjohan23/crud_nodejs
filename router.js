const express = require("express");
const router = express.Router();
const pool = require("./database/db");

router.get("/", async (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query("SELECT * FROM usuarios", (err, results) => {
      res.render("index.ejs", { results: results });
    });
  });
});

// manejar error 404
router.use((req, res) => {
  res.status(404).render("404.ejs");
});

module.exports = router;
