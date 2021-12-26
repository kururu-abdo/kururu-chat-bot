module.exports =(app , io)=>{

    const controller = require('../controllers/account.controller')
    app.post('/accounts/add', controller.create)
    app.post('/accounts/delete' , controller.delete)
    app.get('/accounts/all' , controller.fetchAccounts)
    app.get('/accounts/search' , controller.search)

    app.post('/accounts/update' , controller.update)


    io.on('connection', (socket) => {  

          socket.on('addAccount', (data)=>{
              
          })
    });

}