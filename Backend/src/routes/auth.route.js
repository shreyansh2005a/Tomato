const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/user/register',authController.authRegisterUser);
router.post('/user/login',authController.authLoginUser);
router.get('/user/logout',authController.authLogoutUser);
router.post('/foodpartner/register',authController.authFoodPartnerRegister);
router.post('/foodpartner/login',authController.authFoodPartnerLogin);
router.get('/foodpartner/logout',authController.authFoodPartnerLogout);
module.exports = router;