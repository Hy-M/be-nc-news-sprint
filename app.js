const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router.js");
const { handle404, handle400, handle500 } = require("./errors/errors");

app.use(express.json())

app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
    res.status(404)
    .send({msg: "Path not found"});
});


app.use(handle404);
app.use(handle400);
app.use(handle500);

module.exports = app;