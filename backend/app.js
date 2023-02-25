const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
app.use(express.json())

// import routes
const product = require("./routes/productRoute");
app.use("/api/v1",product);
// use middleware
app.use(errorMiddleware);
module.exports = app;
