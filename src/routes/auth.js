const { Router } = require('express');
const { AuthCtrl } = require('../controllers');
const { validateBody, validateToken } = require('../middleware');
const { userSchema, recoverPasswordSchema } = require('../schema');

const router = Router();

router.post('/register', validateBody(userSchema), AuthCtrl.register);
router.post('/login', validateBody(userSchema), AuthCtrl.login);
router.get('/logout', validateToken, AuthCtrl.logout);

router.patch('/forgotPassword', validateBody(userSchema), AuthCtrl.forgotPassword);
router.patch('/recoverPassword', validateBody(recoverPasswordSchema), AuthCtrl.recoverPassword);

module.exports = router;
