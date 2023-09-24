require("dotenv").config();
const express = require("express");
require("./config/modelConfig");

const app = express();

const HOST = "localhost";
const PORT = process.env.PORT || 8001;

const mainRouter = require("./routes/mainRouter");

app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`server is running on http://${HOST}:${PORT}`);
});
