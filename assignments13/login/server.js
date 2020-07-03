const express = require('express');
const bodyparser = require('body-parser');

const app = express();
//Content-type : application/json
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.json({message:'Welcome to Dhyanahitha'});
});

require('./app/routes/login.routes.js')(app);

app.listen(3001,()=>{
    console.log('Server is Running on port 3001');
});