const express = require("express");
const router = express.Router();
router.get('/', (req,res) =>{
    res.render('index');
});
router.get('/register', (req,res) =>{
    res.render('register');
});
router.get('/login', (req,res) =>{
    res.render('login');
});
router.get('/store',(req,res) =>{
    res.render('store');
});
router.get('/about',(req,res) =>{
    res.render('about');
})
router.get('/contact',(req,res) =>{
    res.render('contact');
})
router.get('/index',(req,res) =>{
    res.render('index');
})
router.get('/update',(req,res) =>{
    res.render('update');
})
router.get('/payment',(req,res) =>{
    res.render('payment');
})
router.get('/feedback',(req,res) =>{
    res.render('feedback');
})
module.exports = router;