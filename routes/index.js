const router = require('koa-router')({
  prefix: '/face'
});
const controllers = require('../controllers');
const { authorizationMiddleware, validationMiddleware } = require('../middlewares/auth');

router.get('/login', authorizationMiddleware, controllers.login);

router.get('/logout', validationMiddleware, controllers.logout);

router.post('/reg', controllers.reg);

router.get('/feed', validationMiddleware, controllers.feed);

router.get('/user', validationMiddleware, controllers.user.get);

router.post('/user', validationMiddleware, controllers.user.post);

module.exports = router;
