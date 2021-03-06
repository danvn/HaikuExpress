var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var accountSid = 'ACe03012c9d0150427a0ae124bd51d96a3';
var authToken = 'f74040cd8dde1e9e861d2022a2382cd4';
var moment = require('moment');
moment().format();

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.use(cookieParser());

//Sends file to server for the home page
app.get('/index.html', function(req, res){
	res.sendFile( __dirname + "/" + "public/index.htm");
});

app.get('/modal_index.htm', function(req,res){
   res.sendFile( __dirname + "/" + "public/modal_index.htm");
});


app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   // Post doesnt include the requests information in the URL
   response = {
      username:req.body.username,
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      phone_number: req.body.usrtel,
      password:req.body.usrpwd
   };
   var userPhone = "+1" + response.phone_number;

   console.log(response);

   if (moment().hour() == 6){
      console.log("It's 6:00 AM");
      client.messages.create({
         to: userPhone, // Needs to be all phone numbers in database
         from: "+13039930055",
         // Replace body with random motivational quote from DB 
         body: "Congratulations, " + response.first_name + " \nMotivation... \nLoading...",
      }, function(err, message) {
         console.log(message.sid);
         });
   }

   res.end(JSON.stringify(response));
});

var server = app.listen(8081, function () {

   var host = server.address().address;
   var port = server.address().port;


   console.log("Example app listening at http://%s:%s", host, port);
});
