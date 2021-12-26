const mongoose = require('mongoose');

const processType = mongoose.Schema({
    
    
 typeName:{type:String  , unique:true},
    // password:String ,
    // place_name: String,
    // price: mongoose.Schema.Types.Decimal128,

    // userID: { type: mongoose.Schema.Types.ObjectId, ref: 'EstateType' },
}, {
    timestamps: true,
});

module.exports = mongoose.model('ProcessType', processType);