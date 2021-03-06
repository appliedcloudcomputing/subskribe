var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  console.log("Called FeedBack JS");
  var currentUser = Parse.User.current();
  if (currentUser) {
    console.log("CURRENT USER : "+ JSON.stringify(currentUser));
    var _user = {
       name : currentUser.get("name"),
       email : currentUser.get("email"),
    }
    res.render('feedback', {user : _user});
    }else {
     
    res.render('login', {title: 'Login', message: Response.InvalidLogin});
  }   
});


router.post('/save', function(req, res, next) {
  	console.log("Called Post Of Feedback");
    console.log(req.body.txtName);
  	console.log(req.body.txtUsername);
	console.log(req.body.txtSubject);
	console.log(req.body.txtDesc);
console.log(req.body.txtDate);

	var feeddata ={
    'name' : req.body.txtName,
    'userName' : req.body.txtUsername,
    'subject' : req.body.txtSubject,
    'desc' : req.body.txtDesc,
    'dates' : req.body.txtDate,
  }	;


Parse.Cloud.run('saveFeedback', feeddata, {
      success: function(message) {
        console.log("Success.....Moving To Cloud Code ...... FeedBack");
      },
      error: function(error) {
        console.log("Error..........");
      }
});
});

module.exports = router;