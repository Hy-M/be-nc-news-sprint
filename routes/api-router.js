const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const { handle405 } = require("../errors/errors");
const { getEndpoints } = require("../controllers/endpoints-controller")
const { checkUserLogin } = require("../controllers/login-controller");

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.get('/', getEndpoints);
// user auth
apiRouter.post('/login', checkUserLogin);
apiRouter.all(handle405)

module.exports = apiRouter;