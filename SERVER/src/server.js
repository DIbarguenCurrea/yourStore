// Paso 1: Aqui llamo a toda la libreria de Express y las rutas de mis endpoints
const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");

// Paso 2: Aqui lo instancio.

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

// Rutas de mis endpoints
app.use("/products", productsRouter);

module.exports = app;
