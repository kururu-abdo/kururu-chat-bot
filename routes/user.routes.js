

const user  = require('../models/User')
module.exports =(app)=>{

    const controller = require('../controllers/user.controller')
    app.post('/user/add', controller.create)
    app.post('/user/delete' , controller.delete)
    app.get('/user/all' , controller.getUsers)
    app.get('/user/login' , controller.login)
    app.post('/user/update' , controller.update)
}