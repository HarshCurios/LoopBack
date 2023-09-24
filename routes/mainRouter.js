const express = require("express");

const productRouter = require("./productRouter");

const mainRouter = express.Router();

mainRouter.use("/product", productRouter);

module.exports = mainRouter;
