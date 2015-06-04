var express = require('express');
var router = express.Router();

//router.get('/adminfaq', function(req, res, next) {
  router.get('/leadlist', function(req, res, next) {
  console.log("Called Leadlist page");

  var d = new Date();
  d.setDate(d.getDate() - 1);
  console.log(d);
   //res.render('leadlist');
   
   var userlist = [];

      var Feedback = Parse.Object.extend("Feedback");
      var userQuery = new Parse.Query(Feedback);
      //var userQuery = new Parse.Query(Parse.Feedback);
      userQuery.find({
        success: function(users) 
        {
          console.log('Feedback Found SUCCESS');
          if(users) {
            users.forEach(function(user) 
            {
              var _user = {
                
                name : user.get('name'),
                username:user.get('username'),
                subject :user.get('subject'),
                desc : user.get('description'),
               
                          }
              userlist.push(_user);
            });
           // res.render('leadlist', {userlist: userlist});
           } 

           else 
           {
            console.log('NO Feedback PRESENT');
           }
        },
        error: function(error) {
          console.log('ERROR FINDING Feedback: ' + error.message);
        }
      });

var pkgchnglist = [];

      var Feedback = Parse.Object.extend("Feedback");
      var userQuery = new Parse.Query(Feedback);
      //var userQuery = new Parse.Query(Parse.Feedback);
      userQuery.find({
        success: function(users) 
        {
          console.log('Change PackageFound SUCCESS');
          if(users) {
            users.forEach(function(user) 
            {
              var _chngpkg = {
                
                name : user.get('name'),
                email : user.get('email'),
                packname : user.get('packname'),
                packprice : user.get('packprice'),
               
                          }
              pkgchnglist.push(_chngpkg);
            });
           // res.render('leadlist', {pkgchnglist : pkgchnglist});
           } 

           else 
           {
            console.log('NO Change Package PRESENT');
           }
        },
        error: function(error) {
          console.log('ERROR FINDING Change Package: ' + error.message);
        }
      });



var quelist = [];

      var Query = Parse.Object.extend("Query");
      var userQuery = new Parse.Query(Query);
      //var userQuery = new Parse.Query(Parse.Feedback);
      userQuery.find({
        success: function(users) 
        {
          console.log('Query Found SUCCESS');
          if(users) {
            users.forEach(function(user) 
            {
              var _que = {
                
                name : user.get('name'),
                username:user.get('username'),
                subject :user.get('subject'),
                desc : user.get('description'),
                about : user.get('about'),
               
                          }
              quelist.push(_que);
            });
            //res.render('leadlist', {quelist: quelist , userlist: userlist});
           } 

           else 
           {
            console.log('NO Feedback PRESENT');
           }
           res.render('leadlist', {quelist: quelist , userlist: userlist , pkgchnglist : pkgchnglist});
        },
        error: function(error) {
          console.log('ERROR FINDING Feedback: ' + error.message);
        }
 
      });
      
   
    });

module.exports = router;