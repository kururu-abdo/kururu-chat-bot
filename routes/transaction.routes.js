module.exports =(app)=>{

    const controller = require('../controllers/transation.controller')
    app.post('/transaction/add', controller.create)
    app.post('/transaction/delete' , controller.delete)
    app.get('/transaction/all' , controller.fetchTransactions)
    app.get('/transaction/types',controller.fetchProcessType)

app.get('/transaction/user',controller.fetchUserTransactions)
app.get('/transaction/last', controller.fetchLimitedTransactions)
app.get('/transaction/term', controller.FindInRange)
app.post('/transaction/update' , controller.update)
app.get('/transaction/user/net-amount' , controller.findNetAmountUser)

app.get('/transaction/me/net-amount' , controller.findNetAmount)

//uid 61bf164e70e5f862b829c0ff
}