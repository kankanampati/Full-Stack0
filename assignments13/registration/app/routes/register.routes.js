module.exports = app =>{
    const registers = require('../controllers/register.controller.js');

    //create a new register
    app.post ("/registers",registers.create);
    //retrieve all the users
    app.get('/registers',registers.findAll);
    //single user
    app.get('/registers/:registerId',registers.findOne);
    //update the register with register id
    app.put('/registers/:registerId',registers.update);
    //delete a register with register Id
    app.delete('/registers/:registerId',registers.delete);
    //Delete all
    app.delete('/registers',registers.deleteAll);
}