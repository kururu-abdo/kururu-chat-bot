const user =require('../models/User')

exports.create = (req, res) => {

   var name = req.body.name;
   var place_name= req.body.place;
   var phone =req.body.phone;
   var password = req.body.password;
console.log(phone);
    const newUser = new user({
        name: name,
        phone: phone,
        place_name: place_name ,
        password:password ,
      
        })

    newUser.save()
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            console.log(typeof err.code);
            if (err.code===11000) {
                res.status(403).send({
                    message: "Phone Or Email has been used BY Another User",
                });
            }else {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating user.',
                });
            }
          
        });
}
exports.login =(req , res)=>{
 
    user.findOne({phone:req.query.phone , password:req.query.password} ,
        function(err, data) {
        if(err){
            res.status(403).json({
                msg:"Authentication failed , try again"
            })
        }
        else{
            console.log("INSIDE LOGIN ROUTE");
            if (data == null) {
                res.status(403).json({"code": "No User" ,"msg":"خطأ في الهاتف أو كلمة المرور"})
            } else {
                res.send(data);

            }
         
        }
    });  
}
exports.getUsers=  (req  ,res)=>{
    user.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  

}
exports.update=(req,res)=>{
    var name = req.body.name;
   var place_name= req.body.place;
   var phone =req.body.phone;
   var password = req.body.password;


    user.findByIdAndUpdate(req.body.id, 
        {
            name: name,
            phone: phone,
            place_name: place_name ,
            password:password ,

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

    user.remove({_id:req.query.id}, 
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