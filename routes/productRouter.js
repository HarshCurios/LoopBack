const express = require("express");

const product = require("../controllers/productControllers");

const productRouter = express.Router();

productRouter.post("/create", product.createProducts);
productRouter.get("/get-csv-file", product.downloadProductsCSV);
productRouter.get("/get-json-data", product.downloadProductsJSON);
productRouter.post("/update-price", product.updatePrices);

module.exports = productRouter;
