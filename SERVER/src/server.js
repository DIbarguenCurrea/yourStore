// Paso 1: Aqui llamo a toda la libreria de Express.
const express = require("express");
const cors = require("cors");

// Paso 2: Aqui lo instancio.

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

module.exports = app;
