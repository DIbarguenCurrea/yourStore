// Paso 1: Aqui llamo a toda la libreria de Express y las rutas de mis endpoints
const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

// Paso 2: Aqui lo instancio.

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend funcionando correctamente",
  });
});

// Rutas de mis endpoints
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

module.exports = app;
