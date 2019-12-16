// error controller functions

exports.handle405 = (req, res, next) => {
    res.status(405).send({
        msg: "Method not allowed"
    });
}
// error-handling middleware functions
exports.handle404 = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({
            msg: "Path not found"
        });
    }
    next(err);
};

exports.handle400 = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({
            msg: "Bad request"
        });
    }
    next(err);
};

exports.handle500 = (err, req, res, next) => {
    res.status(500).send("Internal server error...");
};