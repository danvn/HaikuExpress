var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var accountSid = 'ACe03012c9d0150427a0ae124bd51d96a3';
var authToken = 'f74040cd8dde1e9e861d2022a2382cd4';


//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use(cookieParser())

app.get('/index.html', function(req, res){
	res.sendFile( __dirname + "/" + "index.htm");
})


app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   // Post doesnt include the requests information in the URL 
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      phone_number: req.body.usrtel,
      password:req.body.usrpwd
   };
   console.log(response);

   client.messages.create({
      to: "+17192721827",
      from: "+13039930055",
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      }, function(err, message) {
      console.log(message.sid);
   });

   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port


   console.log("Example app listening at http://%s:%s", host, port)
})

