
var Account= require('../models/accounts')


exports.create= (req, res ) => {

    var name = req.body.name;
    

     const newUser = new Account({
        accountName: name,
        
       
         })
 
     newUser.save()
         .then((data) => {
             res.send(data);


             Account.find(function(err, data) {
                if(err){
                    console.log(err);
                }
                else{
                    
                    res.send(data);
                }
            });  


         }).catch((err) => {
              console.log(err);
             if (err.code===11000) {
                 res.status(404).send({
                     message: "Account Name Already exit!",
                 });
             }else {
                 res.status(500).send({
                     message: err.message || 'Some error occurred while creating user.',
                 });
             }
           
         });
 }
 
 exports.fetchAccounts=  (req  ,res)=>{
     Account.find(function(err, data) {
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
   
 
 
     Account.findByIdAndUpdate(req.body.id, 
         {
             name: name,
          
 
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
 
     Account.remove({_id:req.query.id}, 
         function(err, data) {
             if(err){
                res.send(err)
             }
             else{
                 res.send(data);
             }
         });  
 
 
 }
 
 exports.search = (req, res) => {
 
    Account.findOne({name:{$regex: req.query.q}}, 
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