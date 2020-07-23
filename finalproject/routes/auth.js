const express = require("express");
const authController = require('../controllers/auth')
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/update', authController.update);
router.post('/feedback',authController.feedback);
router.get('/store');
router.get('/about');
router.get('/contact');
router.get('/index')
router.get('/payment')
module.exports = router;