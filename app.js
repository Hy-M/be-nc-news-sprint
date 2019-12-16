const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router.js");
const { handle404 } = require("./errors/errors");


app.use('/api', apiRouter);
app.use('/*', handle404);


module.exports = app;