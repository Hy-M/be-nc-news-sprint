const usersRouter = require("express").Router();
const {
    getUserById
} = require("../controllers/users-controller");
const {
    handle405
} = require("../errors/errors");

usersRouter
    .route('/:username')
    .get(getUserById)
    .all(handle405);

module.exports = usersRouter;