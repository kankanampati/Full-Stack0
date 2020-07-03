module.exports = app =>{
    const users = require('../controllers/login.controller.js');

    //create a new user
    app.post ("/users",users.create);
    //retrieve all the users
    app.get('/users',users.findAll);
    //single user
    app.get('/users/:userId',users.findOne);
    /*//update the user with user id
    app.put('/users/:userId',users.update);*/
    //delete a user with user Id
    app.delete('/users/:userId',users.delete);
    //Delete all
    app.delete('/users',users.deleteAll);
}