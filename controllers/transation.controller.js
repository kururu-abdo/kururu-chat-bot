const Transaction =require('../models/transaction')
const Types = require('../models/proce_type');
const { request } = require('express');
const mongoose = require('mongoose')

exports.create = (req, res) => {

   var amount = req.body.amount;
   var note= req.body.note||'';
   var type =req.body.type;
   var account = req.body.account;
   var user = req.body.user;

    const trans = new Transaction({
        amount: amount,
    
        // phone:{type:String  , unique:true},
        // password:String ,
         note : note,
        // price: mongoose.Schema.Types.Decimal128,
        type: type,
    
        account: account,
        userID: user,
      
        })

        trans.save()
        .then((data) => {
            console.log(data);
            res.send(data);
        }).catch((err) => {
         console.log(err);
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating user.',
                });
            
          
        });
}
exports.fetchProcessType =(req , res)=>{
    Types.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
}
exports.login =(req , res)=>{
    console.log(req.query.password);
    user.findOne({email:req.query.email , password:req.query.password} ,
        function(err, data) {
        if(err){
            res.json({
                msg:"Authentication failed , try again"
            })
        }
        else{
            console.log("INSIDE LOGIN ROUTE");
            console.log(data);
            res.send(data);
        }
    });  
}
exports.fetchUserTransactions= async (req  ,res)=>{


    var trans =await Transaction.find({account:req.query.uid})
    .
    populate({ path: 'userID'})
    .populate({path:'account'})
    .populate({path:'type'})
       .exec()
 res.send(trans)

console.log(trans);

     // Transaction.find(function(err, data) {
     //     if(err){
     //         console.log(err);
     //     }
     //     else{
     //         res.send(data);
     //     }
     // });  
 
 }
 exports.findNetAmountUser =async(req , res)=>{

    
  var inAMount = await findAcountINAmount(req.query.account , req.query.uid);
  var outAmount = await findAcountOUTAmount(req.query.uid , req.query.account)


   var  inMoney 
  var outMoney 
if (inAMount.length>0) {
    inMoney = inAMount[0].count
}else {
    inMoney =0.0
}
if (outAmount.length>0) {
    outMoney = outAmount[0].count 
}else{
outAmount =0.0
}

var net = outMoney-inMoney;
res.json({net_amount:net})



 }


 exports.findNetAmount =async(req , res)=>{

    
    var inAMount = await findUserINAmount(req.query.uid)
    var outAmount = await findUserOUTAmount(req.query.uid )
  
  
     var  inMoney 
    var outMoney 
  if (inAMount.length>0) {
      inMoney = inAMount[0].count
  }else {
      inMoney =0.0
  }
  if (outAmount.length>0) {
      outMoney = outAmount[0].count 
  }else{
  outAmount =0.0
  }
  
  var net = outMoney-inMoney;
  res.json({net_amount:net})
  
  
  
   }




 const operationIN ="61c2ffc73e55d847df87968f"
 const operationOUT ="61c2ffc73e55d847df879690"
async function findAcountINAmount(account ,uid) {
        
    const result  =await Transaction.aggregate([
        {
          $match: {
            $and:[ {userID:mongoose.Types.ObjectId( uid)},
            {account:mongoose.Types.ObjectId(  account)},
           { type: mongoose.Types.ObjectId( operationIN)}
            ]
          }
        },
        {
          $group: {
            _id: "$account",
            count: {
              $sum: "$amount"
            }
          }
        }
      ])

      return result
}
async   function findAcountOUTAmount(uid   , account) {
    const result  =await Transaction.aggregate([
        {
          $match: {
            $and:[ {userID:mongoose.Types.ObjectId( uid)},
                {account:mongoose.Types.ObjectId(  account)},
               { type: mongoose.Types.ObjectId( operationOUT)}
                ]
          }
        },
        {
          $group: {
            _id: "$account",
            count: {
              $sum: "$amount"
            }
          }
        }
      ])

      return result
}
async function findUserINAmount(uid) {
    const result  =await Transaction.aggregate([
        {
          $match: {
           $and:[
           { userID: mongoose.Types.ObjectId(uid)},
          
           { type:  mongoose.Types.ObjectId(operationIN)}
           ]
          }
        },
        {
          $group: {
            _id: "$userID",
            count: {
              $sum: "$amount"
            }
          }
        }
      ])

      return result
}
async function findUserOUTAmount(uid) {
    const result  =await Transaction.aggregate([
        {
          $match: {
            $and:[
                { userID: mongoose.Types.ObjectId(uid)},
               
                { type:  mongoose.Types.ObjectId(operationOUT)}
                ]
          }
        },
        {
          $group: {
            _id: "$userID",
            count: {
              $sum: "$amount"
            }
          }
        }
      ])

      return result
}



 exports.findNetAmountWithUser =async(req , res)=>{

    
    const result  =await Transaction.aggregate([
        {
          $match: {
            userID: {$ne:req.query.uid},
            account: {$ne:req.query.account},
            // type: "61c2ffc73e55d847df879690"
          }
        },
        {
          $group: {
            _id: "$account",
            count: {
              $sum: "$amount"
            }
          }
        }
      ])
  
       console.log(result);
      

 }



exports.fetchTransactions= async (req  ,res)=>{


   var trans =await Transaction.find()
  
   .populate({path:'userID'})
   .populate({path:'account'})
   .populate({path:'type'})

   .exec()
      console.log(trans);
res.send(trans)
    // Transaction.find(function(err, data) {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.send(data);
    //     }
    // });  

}

exports.FindInRange=  (req  ,res)=>{
    Transaction.find({
        $and:[{date:{$lte:req.body.startDate}} ,{date:{$gte:req.body.endDate}} ]
    },function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  

}

exports.fetchLimitedTransactions=  (req  ,res)=>{

    Transaction.  find()
    .populate({path:'userID'})
    .populate({path:'account'})
    .populate({path:'type'})
    .sort({date: 'desc'})
    .limit(5)
    .
    exec(function (err, trans) {
      if (err) return handleError(err);
     res.send(trans)
      // prints "The author is Ian Fleming"
    });
  



    // Transaction.find(function(err, data) {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.send(data);
    //     }
    // }).sort({date: 'desc'})
    // .limit(5);  

}
exports.update=(req,res)=>{
    var note= req.body.note||'';
   var type =req.body.type;
   var account = req.body.account;
   var user = req.body.user;

    Transaction.findByIdAndUpdate(req.body.id, 
        {
        
        // phone:{type:String  , unique:true},
        // password:String ,
        note : note,
        // price: mongoose.Schema.Types.Decimal128,
        type: type,
    
        account: account,
        userID: user,

        }, function(err, data) {
            if(err){
             res.json({
                 msg:"error happen"
             })
            }
            else{
                res.send(data);
        
            }
        }); 
}
exports.delete = (req, res) => {

    Transaction.remove({_id:req.query.id}, 
        function(err, data) {
            if(err){
               res.send(err)
            }
            else{
                res.send(data);
            }
        });  


}


/*
router.get('/findfirst', function(req, res) {
    StudentModel.findOne({StudentId:{$gt:185}}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
});


router.get('/delete', function(req, res) {
    StudentModel.remove({StudentId:188}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
});

router.post('/delete', function(req, res) {
    StudentModel.findByIdAndDelete((req.body.id), 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data Deleted!");
        }
    });  
});


router.post('/update', function(req, res) {
    StudentModel.findByIdAndUpdate(req.body.id, 
    {Name:req.body.Name}, function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data updated!");
        }
    });  
});

*/