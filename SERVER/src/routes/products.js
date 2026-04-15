const { Router } = require("express");
const { getProducts } = require("../controllers/products");

const productsRouter = Router();
productsRouter.get("/", getProducts);

module.exports = productsRouter;
