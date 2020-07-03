module.exports = app =>{
    const feedbacks = require('../controllers/feedback.controller.js');

    //create a new feedback
    app.post ("/feedbacks",feedbacks.create);
    //retrieve all the users
    app.get('/feedbacks',feedbacks.findAll);
    //single user
    app.get('/feedbacks/:feedbackId',feedbacks.findOne);
    //update the feedback with feedback id
    app.put('/feedbacks/:feedbackId',feedbacks.update);
    //delete a feedback with feedback Id
    app.delete('/feedbacks/:feedbackId',feedbacks.delete);
    //Delete all
    app.delete('/feedbacks',feedbacks.deleteAll);
}