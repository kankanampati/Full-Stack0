const sql = require('./db.js');

const Register = function(register){
    this.email = register.email;
    this.name = register.name;
    this.password = register.password;
};

Register.create = (newRegister,result) => {
    sql.query('insert into registers set ?',newRegister,(err,res) =>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log("Created Register : ",{id:res.insertedId,...newRegister});
        return (null,{id:res.insertedId,...newRegister});
    })
};

Register.findById = (registerId,result) => {
    sql.query(`select * from registers where Id = ${registerId}`,(err,res) =>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log('Found Register:',res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:'not_found'},null);
    })
};

Register.getAll = result =>{
    sql.query('select * from registers',(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log('Registers : ',res);
        result(null,res);
    })
};

Register.updateById = (id,register,result) =>{
    sql.query('update registers set email = ? where id = ?',
    [register.email,id],(err,res) =>{
        if(err){
            console.log(err);
            result(null,res);
            return;
        }
        if(res.affectedRows == 0){
            result({kind:'Not_Found'},null);
            return;
        }
        console.log('Updated Register : ',{id:id,...register});
        result(null,{id:id,...register});
    });
};

Register.remove = (id,result) =>{
    sql.query('delete from registers where id = ?',id,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
            return;
        }
        if(res.affectedRows == 0){
            result({kind:'Not_Found'},null);
            return;
        }
        console.log('Deleted Csutomer with Id : ',id);
        result(null,res);
    });
};


Register.removeAll = result =>{
    sql.query('delete from registers',(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
            return;
        }
        console.log('Deleted ${res.affectedRows} Registers')
        result(null,res);
    });
};


module.exports = Register;