const sql = require('../models/db.js');

const Feedback = function(feedback){
    this.name = feedback.name;
    this.password = feedback.password;
    this.feedback = feedback.feedback;
};

Feedback.create = (newFeedback,result) => {
    sql.query('insert into feedbacks set ?',newFeedback,(err,res) =>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log("Created Feedback : ",{id:res.insertedId,...newFeedback});
        return (null,{id:res.insertedId,...newFeedback});
    })
};

Feedback.findById = (feedbackId,result) => {
    sql.query(`select * from feedbacks where Id = ${feedbackId}`,(err,res) =>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log('Found Feedback:',res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:'not_found'},null);
    })
};

Feedback.getAll = result =>{
    sql.query('select * from feedbacks',(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log('Feedbacks : ',res);
        result(null,res);
    })
};

Feedback.updateById = (id,feedback,result) =>{
    sql.query('update feedbacks set password = ? where id = ?',
    [feedback.password,id],(err,res) =>{
        if(err){
            console.log(err);
            result(null,res);
            return;
        }
        if(res.affectedRows == 0){
            result({kind:'Not_Found'},null);
            return;
        }
        console.log('Updated Feedback : ',{id:id,...feedback});
        result(null,{id:id,...feedback});
    });
};

Feedback.remove = (id,result) =>{
    sql.query('delete from feedbacks where id = ?',id,(err,res)=>{
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


Feedback.removeAll = result =>{
    sql.query('delete from feedbacks',(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
            return;
        }
        console.log('Deleted ${res.affectedRows} Feedbacks')
        result(null,res);
    });
};


module.exports = Feedback;