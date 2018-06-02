const path = require('path');
const router = require('koa-router')({
  prefix: '/hack'
});
const multer = require('koa-multer');
const controllers = require('../controllers');
const { authorizationMiddleware, validationMiddleware } = require('../middlewares/auth');
/*
const uploader = multer({ 
  storage: {
    destination: (req, file, cb) => cb(null, '/tmp/hack/'),
    filename: (req, file, cb) => cb(null, `${file.filename}-${Date.now()}`),
  }
});
*/
const uploader = multer({ dest: '/tmp/hack' })

router.get('/login', authorizationMiddleware, controllers.login);

router.get('/logout', validationMiddleware, controllers.logout);

router.post('/reg', controllers.reg);

router.get('/feed/:type', validationMiddleware, controllers.feed.get);

router.get('/user', validationMiddleware, controllers.user.get);

router.post('/user', validationMiddleware, controllers.user.post);

router.post('/face', validationMiddleware, uploader.single('face'), controllers.face.post);

router.post('/chat/send', validationMiddleware, controllers.chat.send);

router.post('/chat/fetch', validationMiddleware, controllers.chat.fetch);

module.exports = router;
