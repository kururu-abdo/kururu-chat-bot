var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var db= require('./models')

var app = express();
var server = require('http').createServer(app);
const io =require('socket.io')(server)

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//CONFIGS
mongoose.connect("mongodb+srv://kururu:abdo2012@cluster0.eqgmd.azure.mongodb.net/mybook?retryWrites=true&w=majority", {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successfully connected to the database');

}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});



  // db.friendsRequests.create({ typeName: "داخل"}, function(err, doc) {
  //     console.log(err);
  // });
  // db.friendsRequests.create({ typeName: "خارج"}, function(err, doc) {
  //     console.log(err);
  // });



// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.get('/' ,(req , res)=>{
  res.send("HI")
})

//REQUIRES
require("./routes/user.routes")(app);
require("./routes/account.routes")(app,io);
require("./routes/transaction.routes")(app);

io.on('connection', (socket) => {  console.log('a user connected');});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(7000, () => {
  console.log(`Server is running`);
});

module.exports.io = io;