const usersRouter = require("express").Router();
const { getUserById } = require("../controllers/users-controller");

usersRouter.get('/:username', getUserById);

module.exports = usersRouter;