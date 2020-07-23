
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
exports.login = async(req, res) => {
    try {
        const { email , password} = req.body;
        if(!email || !password) {
            return res.status(400).render('login',{
                message: 'please enter email and password'
            })
        }
        db.query('SELECT * FROM register WHERE email = ?', [email], async (error,results)=>{
            console.log(results);
            if(!results || password!=results[0].userpassword){
                res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                })
            }
            else{
                const id = results[0].id;
                const token = jwt.sign({id}, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("The token is:" +token);
                const cookieOptions = {
                    expiresIn: new Date(
                        Date.now() +process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 *1000
        ),
        httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/store");
            }
        })
    } catch (error) {
        console.log(error);
    }
}



exports.register = (req,res) =>{
    console.log(req.body);
    const { name, email, mobilenumber, password, passwordConfirm}=req.body;
    db.query('select email FROM register WHERE email = ?', [email], async(error, results) =>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('register' ,{
                message: 'email is already in use'
            })
        }
        else if(password!==passwordConfirm) {
            return res.render('register' ,{
                message: 'passwords donot match'
    });
}
db.query('INSERT INTO register SET ?', {username: name, email: email, userpassword: password, mobilenumber: mobilenumber}, (error,results) => {
    if(error) {
        console.log(error);
    }else {
        console.log(results);
        return res.render('register' ,{
            message: 'User registered'
});
    }
})
});
}

exports.feedback = (req,res) =>{
    console.log(req.body);
    const { email,username,feedback}=req.body;
    db.query('select email FROM feedback WHERE email = ?', [email], async(error, results) =>{
        if(error){
            console.log(error);
        }
        if(!results){
            return res.render('feedback' ,{
                message: 'Please enter valid email'
            })
        }
db.query('INSERT INTO feedback SET ?', {username: username, email: email, feedback : feedback}, (error,results) => {
    if(error) {
        console.log(error);
    }else {
        console.log(results);
        return res.render('feedback' ,{
            message: 'Thanks For Your Feedback'
});
    }
})
}); }





exports.update=(req,res)=>{
    console.log(req.body);
    const{email,password,passwordConfirm}=req.body;
    db.query('select email from register where email=?',[email],async(error,results)=>{
        console.log(results);
        if(error){
            console.log(error);
        }
        else if(email==results[0].email){
            if(password!==passwordConfirm){
                return res.render('update',{
                    message:'password do not match'
                });
            }
            else{
                db.query('update register set userpassword=? where email=?',[password,email],(error,results)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log(results);
                        return res.render('update',{
                            message:'password updated'
                        });
       
                    }
                });
            }
            }
        else{
             return res.render('update',{
                 message:' email doesnot exist'
                });
            }
    });
}
