const router = require('koa-router')({
  prefix: '/face'
});
const controllers = require('../controllers');
const { authorizationMiddleware, validationMiddleware } = require('../middlewares/auth');
const { vipCheckMiddleware } = require('../middlewares/vipcheck');

router.get('/login', authorizationMiddleware, controllers.login);

router.get('/logout', validationMiddleware, controllers.logout);

router.get('/url', validationMiddleware, vipCheckMiddleware, controllers.url);

//router.post('/cookies', controllers.cookies);

router.get('/vipcard', validationMiddleware, controllers.vipcard);

router.post('/reg', controllers.reg);

router.get('/activate', controllers.activate);

router.get('/captcha', controllers.captcha);

module.exports = router;
