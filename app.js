const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes/api-router.js");
const { handle401, handle404, handle400, handle500 } = require("./errors/errors");
const jwt = require("jsonwebtoken");

app.use(express.json())
app.use(cors())

app.use('/api', apiRouter);
app.use('/*', (req, res, next) => {
    res.status(404)
    .send({msg: "Path not found"});
});
app.use((req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) next({ status: 401, msg: 'Unauthorised' });
      else next();
    });
});  

app.use(handle401);
app.use(handle404);
app.use(handle400);
app.use(handle500);

module.exports = app;