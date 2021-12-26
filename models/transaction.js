const mongoose = require('mongoose');

const trans = mongoose.Schema({
    
    amount: Number,
    date: { type:Date ,default: Date.now },

    // phone:{type:String  , unique:true},
    // password:String ,
     note : String,
    // price: mongoose.Schema.Types.Decimal128,
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'ProcessType' },

    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Transaction', trans);