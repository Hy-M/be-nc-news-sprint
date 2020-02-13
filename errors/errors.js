// error controller functions
exports.handle405 = (req, res, next) => {
    res.status(405).send({
        msg: "Method not allowed"
    });
}

// error-handling middleware functions
exports.handle401 = (err, req, res, next) => {
    if (err.status === 401) {
        res.status(401).send({ msg: err.msg });
    }
    next(err);
};

exports.handle404 = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({
            msg: err.msg
        });
    }
    next(err);
};

exports.handle400 = (err, req, res, next) => {        
    const codes = ['22P02'];
    if (err.status === 400 || codes.includes(err.code)) {
        res.status(400).send({
            msg: "Bad request"
        });
    }
    next(err);
};

exports.handle500 = (err, req, res, next) => {
    res.status(500).send("My internal server error...");
};