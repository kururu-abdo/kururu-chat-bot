var db={}

db.user=require('./User')

db.friends = require('./accounts')
db.friendsRequests = require('./proce_type')

db.message= require('./transaction')


module.exports= db;