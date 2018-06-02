const router = require('koa-router')({
  prefix: '/face'
});
const multer = require('koa-multer');
const controllers = require('../controllers');
const { authorizationMiddleware, validationMiddleware } = require('../middlewares/auth');

router.get('/login', authorizationMiddleware, controllers.login);

router.get('/logout', validationMiddleware, controllers.logout);

router.post('/reg', controllers.reg);

router.get('/feed/:type', validationMiddleware, controllers.feed);

router.get('/user', validationMiddleware, controllers.user.get);

router.post('/user', validationMiddleware, controllers.user.post);

router.get('/face', validationMiddleware, controllers.face);

module.exports = router;
