// error controller functions
exports.handle404 = (req, res, next) => {
    res.status(404).send({msg: "Path not found"});
};

exports.handle405 = (req, res, next) => {
    res.status(405).send({msg: "Method not allowed"});
}
// error-handling middleware functions
