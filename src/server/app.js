var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));
app.use('/', express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test_new');
var db = mongoose.connection;
mongoose.Promise = global.Promise;


// Models
var User = require('./user.model.js');
var Content = require('./content.model.js');
var Reward = require('./reward.model.js');
var Department = require('./department.model.js');
var Company = require('./company.model.js');
var UserLogOns = require('./user_log_ons.model.js');
var TaskCompleted = require('./task_completed.model.js');
var RewardRedemptions = require('./reward_redemptions.model.js');
var TransferTokens = require('./transfer_tokens.model.js');

var development_server_ip = "http://localhost:3000";
var production_server_ip = "http://app.getpayd.io";
var staging_server_ip = "https://getpayd-new-warzi117.c9users.io:8080";
// var server_ip = development_server_ip;
// var server_ip = production_server_ip;
var server_ip = staging_server_ip;

var api_key = 'key-9cc58f4c99d912d09f852845200a4803';
var domain = 'app.getpayd.io';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});   

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  //authenticate user
  app.post('/authenticate', function(req, res){
      // find if any user matches login credentials
      console.log(req.body.email, "    ", req.body.password);
      User.findOne({email:req.body.email, password:req.body.password}, function(err, docs){
        if (err) return console.log(err);
        console.log("none user");
        if (docs === null) {
          Company.findOne({email:req.body.email, password:req.body.password}, function(err, docs){
            if (err) return console.log(err);
            res.status(200).json(docs);
          });
        }
        else {
          var obj = new UserLogOns();
          obj.user_id = docs._id;
          obj.time = new Date();
          if (docs.company){
            obj.company_id = docs.company._id;
          }
          obj.department_id = docs.department._id;
          console.log("UserLogOns", obj);
          obj.save(function(err, res1) {
            if (err) return console.log(err);
            return res.status(200).json(docs);
          });
        }
      });
    });

  //User
  // select all
  app.get('/users/:id', function(req, res) {
    User.find({_id: req.params.id}, function(err, docs) {
      if(err) return console.error(err);
      if (docs.length != 0) {
        User.find({}, function(err, docs){
          if (err) return console.error(err);
          return res.status(200).json(docs);
        });
      }
      else {
        User.find({'company._id': req.params.id}, function(err, docs) {
          if (err) return console.error(err);
          return res.status(200).json(docs);          
        });
      }
    });
  });
  //get user
  app.get('/specific_user/:id', function(req, res) {
    User.findById(req.params.id, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });
  // create user
  app.post('/user', function(req, res) {
    var obj = new User(req.body);
    create_department(obj.department, function(obj1) {
      obj.department = obj1;
      obj.save(function(err, obj) {
        if(err) return console.error(err);
        res.status(200).json(obj);
      });
    });
  });
  // update by id
  app.put('/user/:id', function(req, res) {
    _id = req.params.id;
    delete req.body._id;
    User.findOneAndUpdate({_id: _id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });
  // delete by id
  app.delete('/user/:id', function(req, res) {
    User.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
  //Company
  // select all
  app.get('/companies', function(req, res) {
    Company.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });
  //get company
  app.get('/specific_company/:id', function(req, res) {
    Company.findById(req.params.id, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });
  // create company
  app.post('/company', function(req, res) {
    var obj = new Company(req.body);
    obj.save(function(err, obj) {
        if(err) return console.error(err);
        res.status(200).json(obj);
    });
  });
  // update by id
  app.put('/company/:id', function(req, res) {
    _id = req.params.id;
    delete req.body._id;
    Company.findOneAndUpdate({_id: _id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });
  // delete by id
  app.delete('/company/:id', function(req, res) {
    Company.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
  //content
  //get all content
  app.get('/contents/:id', function(req, res) {
    console.log('content user id', req.params.id);
    User.find({_id: req.params.id}, function(err, docs) {
      if(err) return console.error(err);
      if (docs.length != 0) {
        Content.find({}, function(err, docs) {
          if(err) return console.error(err);
          res.json(docs);
        });
      }
      else {
        Content.find({'company._id': req.params.id}, function(err, docs) {
          if(err) return console.error(err);
          res.json(docs);
        });
      }
    });
  });
  //get content
  app.get('/content/:id', function(req, res) {
    Content.findById(req.params.id, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });
  // create content
  app.post('/content', function(req, res) {
    var obj = new Content(req.body);
    console.log("content------------------------------", req.body);
    obj.date_created = new Date();
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      if (req.body["isSendMessage"] === 1) {
        User.find({'company._id': obj["company"]["_id"]}, function(err1, users){
          if (err1) console.log(err1);
          for (var user of users) {
            var subject = "New Task Available";
            var content = "Hello, there is a new task available on PAYD.  Please log in to complete at your convenience." + " " +server_ip; 
            if (req.body["message_subject"] != "") {
              subject = req.body["message_subject"];
            }
            if (req.body["message_content"] != "") {
              content = req.body["message_content"] + " " + server_ip;
            }
            var data = {
              from: 'Excited User <me@samples.mailgun.org>',
              to: user["email"],
              subject: subject,
              text: content
            };             
            mailgun.messages().send(data, function (err, body) {
              if (err) {
                console.log(err);
              } 
            });
          }
          res.status(200).json(obj);
        })
      }
      else {
        res.status(200).json(obj);
      }
    });
  });
  // update by id
  app.put('/content/:id', function(req, res) {
    _id = req.params.id;
    delete req.body._id;
    Content.findOneAndUpdate({_id: _id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });
  //get available contents
  app.get('/get_available_contents/:company_id/:department_v/:department_id/:department_name', function(req, res) {
    // Content.find({'company._id':req.params.company_id,available_to: {__v: Number(req.params.department_v), department : req.params.department_name, _id : req.params.department_id }}, function(err, docs) {
    Content.find({'company._id':req.params.company_id,available_to: {__v: Number(req.params.department_v), _id : req.params.department_id, department : req.params.department_name }}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });
  // delete by id
  app.delete('/content/:id', function(req, res) {
    Content.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
  //reward
  //get all reward
  app.get('/rewards/:id', function(req, res) {
    User.find({_id: req.params.id}, function(err, docs) {
      if(err) return console.error(err);
      if (docs.length != 0) {
        Reward.find({}, function(err, docs) {
          if(err) return console.error(err);
          res.json(docs);
        });
      }
      else {
        Reward.find({'company._id': req.params.id}, function(err, docs) {
          if(err) return console.error(err);
          res.json(docs);
        });
      }
    });
  });
  //get available rewards
  app.get('/get_available_rewards/:company_id/:department_v/:department_id/:department_name', function(req, res) {
    console.log(req.params.company_id);
    // Reward.find({'company._id': req.params.company_id, available_to: {__v: Number(req.params.department_v), department : req.params.department_name, _id : req.params.department_id }}, function(err, docs) {
    Reward.find({'company._id': req.params.company_id, available_to: {__v: Number(req.params.department_v), _id : req.params.department_id, department : req.params.department_name }}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  //transfer value
  app.post('/transfer_tokens/:sender_id/:receiver_id/:value', function(req, res) {
    var message_body = req.body["message_body"];
    var sender_email, receiver_email;
    var sender, receiver;
    User.findOne({_id: req.params.sender_id},function(err, user){
      user.available_tokens = parseInt(user.available_tokens) - parseInt(req.params.value);
      sender_email = user.email;
      sender = user;
      console.log("sender email", sender_email);
      user.save();
      User.findOne({_id: req.params.receiver_id},function(err, user){
        user.available_tokens = parseInt(user.available_tokens) + parseInt(req.params.value);
        receiver_email = user.email;
        console.log("receiver email", receiver_email);
        user.save();
        receiver = user;

        //Save to Transfer Tokens
        var transfer_tokens = new TransferTokens({
          number_of_tokens: req.params.value,
          send_user: sender,
          receive_user: receiver,
          time: new Date()
        });
        
        transfer_tokens.save(function(err, transfer_tokens) {
          if (err) console.log(err);
        })

        var data = {
          from: "Excited User <me@samples.mailgun.org>",
          to: receiver_email,
          subject: "Transfer Tokens",
          text: message_body
        };         
        mailgun.messages().send(data, function (err, body) {
          if (err) {
            console.log(err);
          } else {
            res.json({success: true, msg: 'sent'});
          }
        });

      });
    });
  });
  //get reward
  app.get('/reward/:id', function(req, res) {
    Reward.findById(req.params.id, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });
  // create reward
  app.post('/reward', function(req, res) {
    var obj = new Reward(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);

      res.status(200).json(obj);
    });
  });
  // update by id
  app.put('/reward/:id', function(req, res) {
    _id = req.params.id;
    delete req.body._id;
    Reward.findOneAndUpdate({_id: _id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });
  // delete by id
  app.delete('/reward/:id', function(req, res) {
    Reward.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
  //department
  //get all departments
  app.get('/departments', function(req, res) {
    Department.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });
  // create department
  app.post('/department', function(req, res) {
    var obj = new Department(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });
  
  function create_department(department, cb) {
    var department_return = null;
    Department.findOne({department: department}, function(err, obj) {
        if (err) return console.errror(err);
        if (obj) {
          console.log("obj", obj);
          department_return = obj;
          return cb(obj);
        }
        else {
          var obj = new Department({department: department});
          obj.save(function(err, obj) {
            if (err) return console.errror(err);
            return cb(obj);
          });   
        }
    });
  }


  //Quizzes
  //get all quizzes
  app.get('/quizzes', function(req, res) {
    Quiz.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });
  //get by id
  app.get('/quiz/:id', function(req,res) {
    _id = req.params.id;
    Content.findOne({_id: _id}, function(err, obj) {
      if(err) return console.error(err);
      res.sendStatus(200).json(obj);
    })
  });
  // create quiz
  app.post('/quiz', function(req, res) {
    var obj = new Quiz(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });
  //send password reset email 
  app.post('/send_password_reset_email', function(req,res){
    console.log(req.body);
    

    var data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: req.body["email"],
      subject: 'Hello',
      text: "We heard that you lost your GetPayd password. Sorry about that! But don’t worry! You can use the following link to reset your password: " + server_ip + "/register/" + req.body["_id"]
    };
     
    mailgun.messages().send(data, function (err, body) {
      if (err) {
        console.log(err);
      } else {
        res.json({success: true, msg: 'sent'});
      }
    });

  });
  //send invitation email to user
  app.post('/send_invitation_to_user', function(req, res){
    
    var data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: JSON.parse(req.body["_body"])["email"],
      subject: 'Hello',
      text: "We would like to invite you for our website. Please confirm at " + server_ip + "/register/" + JSON.parse(req.body["_body"])._id + " to our website",
    };
     
    mailgun.messages().send(data, function (err, body) {
      if (err) {
        console.log(err);
      } else {
        res.json({success: true, msg: 'sent'});
      }
    });

  })

  //send invitation email to company
  app.post('/send_invitation_to_company', function(req, res){
    
    var data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: JSON.parse(req.body["_body"])["email"],
      subject: 'Hello',
      text: "We would like to invite you as manger for your company group. Please confirm at " + server_ip + "/register_company/" + JSON.parse(req.body["_body"])._id + " to our website",
    };
     
    mailgun.messages().send(data, function (err, body) {
      if (err) {
        console.log(err);
      } else {
        res.json({success: true, msg: 'sent'});
      }
    });

  })

  //send invitation email to company
  app.post('/send_email_regarding_reward', function(req, res){
    
    var user = req.body.user;
    var reward = req.body.reward;
    var number = req.body.number;

    var data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: user.company.email,      
      subject: 'Hello',
      text: user.first_name + " " + user.last_name + " bought " + number + " " + reward.name + "(s)",
    };
     
    mailgun.messages().send(data, function (err, body) {
      if (err) {
        console.log(err);
      } else {
        res.json({success: true, msg: 'sent'});
      }
    });
  })

  // get_log_ons 
  app.get('/get_log_ons/:company_id/:department_id/:user_id/:date_from/:date_end', function(req, res){
    console.log("user id && department id",req.params.user_id, req.params.department_id);
    if (req.params.user_id != "undefined") {
      console.log("user");
      UserLogOns.find({user_id: req.params.user_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, log_ons) {
          if (err) return console.log(err);
          res.json(log_ons);
      });      
    } else if (req.params.department_id != "undefined") {
      console.log("department");
      UserLogOns.find({company_id:req.params.company_id, department_id: req.params.department_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, log_ons) {
          if (err) return console.log(err);
          res.json(log_ons);
      });
    } else {
      console.log("company");
      UserLogOns.find({company_id:req.params.company_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, log_ons) {
          if (err) return console.log(err);
          res.json(log_ons);
      });
    }
  })
  // get task completed
  app.get('/get_task_completed/:company_id/:department_id/:user_id/:date_from/:date_end', function(req, res) {
    if (req.params.user_id != "undefined") {
      TaskCompleted.find({'user._id': req.params.user_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, tasks){
          if (err) return console.log(err);
          res.json(tasks);
      });
    }
    else if (req.params.department_id != "undefined") {
      TaskCompleted.find({'user.company._id':req.params.company_id, 'user.department._id': req.params.department_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, tasks) {
        if (err) return console.log(err);
        res.json(tasks);
      });
    }
    else {
      TaskCompleted.find({'user.company._id':req.params.company_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, tasks) {
        if (err) return console.log(err);
        res.json(tasks);
      });
    }
  })
  app.post('/new_task_completed', function(req, res){
    var new_task_completed = new TaskCompleted(req.body);
    new_task_completed.save(function(err, res1){
      if (err) return console.log(err);
      res.status(200).json(res1);
    });
  })

  // get points awarded
  app.get('/get_points_awarded/:company_id/:department_id/:user_id/:date_from/:date_end', function(req, res) {
    if (req.params.user_id != "undefined") {
      PointsAwarded.find({'user._id': req.params.user_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, tasks){
          if (err) return console.log(err);
          res.json(tasks);
      });
    }
    else if (req.params.department_id != "undefined") {
      PointsAwarded.find({'user.company._id':req.params.company_id, 'user.department._id': req.params.department_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, tasks) {
        if (err) return console.log(err);
        res.json(tasks);
      });
    }
    else {
      PointsAwarded.find({'user.company._id':req.params.company_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, tasks) {
        if (err) return console.log(err);
        res.json(tasks);
      });      
    }

  })
  app.post('/new_points_awarded', function(req, res){
    var new_points_awarded = new PointsAwarded(req.body);
    new_points_awarded.save(function(err, res1){
      if (err) return console.log(err);
      res.status(200).json(res1);
    });
  })

  // get reward redemptions
  app.get('/get_reward_redemptions/:company_id/:department_id/:user_id/:date_from/:date_end', function(req, res) {
    if (req.params.user_id != "undefined") {
      RewardRedemptions.find({'user._id': req.params.user_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, tasks){
          if (err) return console.log(err);
          res.json(tasks);
      });
    }
    else if (req.params.department_id != "undefined") {
      RewardRedemptions.find({'user.company._id':req.params.company_id, 'user.department._id': req.params.department_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, tasks) {
        if (err) return console.log(err);
        res.json(tasks);
      });
    }
    else {
      RewardRedemptions.find({'user.company._id':req.params.company_id, time: {$gte: req.params.date_from, $lte:req.params.date_end}}, function(err, tasks) {
        if (err) return console.log(err);
        res.json(tasks);
      });      
    }
  })
  app.post('/new_reward_redemptions', function(req, res){
    var new_points_awarded = new RewardRedemptions(req.body);
    new_points_awarded.save(function(err, res1){
      if (err) return console.log(err);
      res.status(200).json(res1);
    });
  })

  app.put('/update_reward_redemptions', function(req, res){
    RewardRedemptions.findOneAndUpdate({'reward._id': req.body.reward_id, 'user._id':req.body.user._id}, {number_of_reward: req.body.number_of_reward}, function(err, reward){
      if (err) console.log(err);
      res.status(200).json(reward);
    });
  })

  //get top 10 videos
  app.get('/get_top_videos/:company_id/:department_id/:user_id/:date_from/:date_end', function(req, res) {
    var date_from = new Date(req.params.date_from);
    var date_end = new Date(req.params.date_end);
    if (req.params.user_id != "undefined") {
      TaskCompleted.aggregate([{$match: {'user._id':req.params.user_id, 'task.type':'video', time: {$gte: date_from, $lte: date_end}}}, {$group: {_id: '$task.title', total: {$sum: 1}}}, {$sort: {total:-1}}, {$limit: 10}], function(err, res1){
        if (err) console.log(err);
        res.json(res1);
      });
    }
    else if (req.params.department_id != "undefined") {
      TaskCompleted.aggregate([{$match: {'user.company._id':req.params.company_id, 'user.department._id': req.params.department_id, 'task.type':'video', time: {$gte: date_from, $lte: date_end}}}, {$group: {_id: '$task.title', total: {$sum: 1}}}, {$sort: {total:-1}}, {$limit: 10}], function(err, res1){
        if (err) console.log(err);
        res.json(res1);
      });
    }
    else {
      TaskCompleted.aggregate([{$match: {'user.company._id':req.params.company_id, 'task.type':'video', time: {$gte: date_from, $lte: date_end}}}, {$group: {_id: '$task.title', total: {$sum: 1}}}, {$sort: {total:-1}}, {$limit: 10}], function(err, res1){
        if (err) console.log(err);
        res.json(res1);
      });      
    }
  })
  //get top 10 videos
  app.get('/get_top_quizzes/:company_id/:department_id/:user_id/:date_from/:date_end', function(req, res) {
    var date_from = new Date(req.params.date_from);
    var date_end = new Date(req.params.date_end);
    if (req.params.user_id != "undefined") {
      TaskCompleted.aggregate([{$match: {'user._id':req.params.user_id, 'task.type':'quiz', time: {$gte: date_from, $lte: date_end}}}, {$group: {_id: '$task.title', total: {$sum: 1}}}, {$sort: {total:-1}}, {$limit: 10}], function(err, res1){
        if (err) return console.log(err);
        res.json(res1);
      });
    }
    else if (req.params.department_id != "undefined") {
      TaskCompleted.aggregate([{$match: {'user.company._id':req.params.company_id, 'user.department._id': req.params.department_id, 'task.type':'quiz', time: {$gte: date_from, $lte: date_end}}}, {$group: {_id: '$task.title', total: {$sum: 1}}}, {$sort: {total:-1}}, {$limit: 10}], function(err, res1){
        if (err) console.log(err);
        res.json(res1);
      });
    }
    else {
      TaskCompleted.aggregate([{$match: {'user.company._id':req.params.company_id, 'task.type':'quiz', time: {$gte: date_from, $lte: date_end}}}, {$group: {_id: '$task.title', total: {$sum: 1}}}, {$sort: {total:-1}}, {$limit: 10}], function(err, res1){
        if (err) console.log(err);
        res.json(res1);
      });      
    }
  })
  //get top Point Users
  app.get('/get_most_point_users/:company_id/:department_id/:date_from/:date_end', function(req, res) {
    var date_from = new Date(req.params.date_from);
    var date_end = new Date(req.params.date_end);

    console.log(req.params.company_id);
    console.log(req.params.department_id);
    console.log(date_from);
    console.log(date_end);

    if (req.params.department_id != "undefined"){
      User.aggregate([{$match: {'company._id':req.params.company_id, 'department._id': req.params.department_id, date_joined: {$gte: date_from, $lte: date_end}}}, {$sort: {available_tokens: -1}}, {$limit: 10}], function(err, res1){
        if (err) return console.log(err);
        console.log("users", res1);
        res.json(res1);
      });      
    }
    else {
      User.aggregate([{$match: {'company._id':req.params.company_id, date_joined: {$gte: date_from, $lte: date_end}}}, {$sort: {available_tokens: -1}}, {$limit: 10}], function(err, res1){
        if (err) return console.log(err);
        console.log("users", res1);
        res.json(res1);
      });            
    }
  })
  //get top Point Departments
  app.get('/get_most_point_departments/:company_id/:date_from/:date_end', function(req, res) {
    var date_from = new Date(req.params.date_from);
    var date_end = new Date(req.params.date_end);

    User.aggregate([{$match: {'company._id':req.params.company_id, date_joined: {$gte: date_from, $lte: date_end}}}, {$group: {_id: '$department.department', total: {$sum : '$available_tokens'}}}, {$sort: {total: -1}}, {$limit: 10}], function(err, res1){
      if (err) return console.log(err);
      console.log("departments", res1);
      res.json(res1);
    });
  })

  //get total number of tasks by department
  app.get('/get_total_number_of_tasks_by_department/:company_id/:date_from/:date_end', function(req, res) {
    var date_from = new Date(req.params.date_from);
    var date_end = new Date(req.params.date_end);

    Department.find({}, function(err, res1) {
      if (err) console.log(err);
      var return_value = [];
      for (var department of res1) {
        Content.find({'company._id':req.params.company_id, date_created: {$gte: date_from, $lte: date_end}, 'available_to' : {department}}, function(err, res2) {
            return_value.push({department_name: department.department, number_of_tasks: res2.length()});
        })

      }
    });
  })
  //get total tasks completed by users
  app.get('/get_total_tasks_completed_by_users/:company_id/:department_id/:date_from/:date_end', function(req, res) {
    var date_from = new Date(req.params.date_from);
    var date_end = new Date(req.params.date_end);
    if (req.params.department_id != "undefined"){
      TaskCompleted.aggregate([{$match: {'user.company._id':req.params.company_id, 'user.department._id':req.params.department_id, time: {$gte: date_from, $lte: date_end}}}, {$group: {_id: {first_name: '$user.first_name', last_name: '$user.last_name', user_id: '$user._id'}, total: {$sum: 1}}}, {$sort: {total: -1}}, {$limit: 10}], function(err, res1) {
        if (err) console.log(err);
        res.json(res1);
      })          
    }
    else {
      TaskCompleted.aggregate([{$match: {'user.company._id':req.params.company_id, time: {$gte: date_from, $lte: date_end}}}, {$group: {_id: {first_name: '$user.first_name', last_name: '$user.last_name', user_id: '$user._id'}, total: {$sum: 1}}}, {$sort: {total: -1}}, {$limit: 10}], function(err, res1) {
        if (err) console.log(err);
        res.json(res1);
      })          
    }
  })
  //get average points per assignment
  app.get('/get_average_points_per_assignment/:company_id/:department_id/:date_from/:date_end', function(req, res) {
    var date_from = new Date(req.params.date_from);
    var date_end = new Date(req.params.date_end);
    if (req.params.department_id != "undefined") {
      User.find({'company._id':req.params.company_id, 'department._id':req.params.department_id}, function(err, users){
        if (err) return console.log(err);
        var avg_array = [];
        for (var user of users) {
          var sum = 0.0;
          for (var activity of user.activities) {
            sum += activity.points_awarded;
          }
          avg_array.push({user: user, avg: sum/user.activities.length});
        }
        for (var i=0;i<users.length;i++) {
          for (var j=i+1;j<users.length;j++) {
            if (avg_array[i].avg < avg_array[j].avg) {
              var temp = avg_array[i];
              avg_array[i] = avg_array[j];
              avg_array[j] = temp;
            }
          }
        }
        res.json(avg_array.slice(0, 10));
      });      
    }
    else {
      User.find({'company._id':req.params.company_id}, function(err, users){
        if (err) return console.log(err);
        var avg_array = [];
        for (var user of users) {
          var sum = 0.0;
          for (var activity of user.activities) {
            sum += activity.points_awarded;
          }
          avg_array.push({user: user, avg: sum/user.activities.length});
        }
        for (var i=0;i<users.length;i++) {
          for (var j=i+1;j<users.length;j++) {
            if (avg_array[i].avg < avg_array[j].avg) {
              var temp = avg_array[i];
              avg_array[i] = avg_array[j];
              avg_array[j] = temp;
            }
          }
        }
        res.json(avg_array.slice(0, 10));
      });      
    }
  })
  //get most reward redemptions
  app.get('/get_most_reward_redemptions/:company_id/:department_id/:user_id/:date_from/:date_end', function(req, res) {
    var date_from = new Date(req.params.date_from);
    var date_end = new Date(req.params.date_end);
    if (req.params.user_id != "undefined") {
      RewardRedemptions.aggregate([{$match: {'user._id':req.params.user_id, time: {$gte: date_from, $lte: date_end}}},{$sort: {number_of_reward: -1}}, {$limit: 10} ], function(err, res1) {
        if (err) return console.log(err);
        res.json(res1);
      })    
    }
    else if (req.params.department_id != 'undefined') {
      RewardRedemptions.aggregate([{$match: {'user.company._id':req.params.company_id, 'user.department._id':req.params.department_id, time: {$gte: date_from, $lte: date_end}}},{$sort: {number_of_reward: -1}}, {$limit: 10} ], function(err, res1) {
        if (err) return console.log(err);
        res.json(res1);
      })    
    }
    else {
      RewardRedemptions.aggregate([{$match: {'user.company._id':req.params.company_id, time: {$gte: date_from, $lte: date_end}}},{$sort: {number_of_reward: -1}}, {$limit: 10} ], function(err, res1) {
        if (err) return console.log(err);
        res.json(res1);
      })          
    }
  })
  //get most sent point user
  app.get('/get_most_sent_point_user/:company_id/:department_id/:date_from/:date_end', function(req, res) {
    var date_from = new Date(req.params.date_from);
    var date_end = new Date(req.params.date_end);
    if (req.params.department_id != "undefined") {
      TransferTokens.aggregate([{$match: {'send_user.company._id':req.params.company_id, 'send_user.department._id':req.params.department_id, time: {$gte: date_from, $lte: date_end}}}, {$group: {_id:{sender: '$send_user._id', first_name: '$send_user.first_name', last_name: '$send_user.last_name'}, total: {$sum: '$number_of_tokens'}}}, {$limit: 10}], function(err, res1) {
        if (err) return console.log(err);
        res.json(res1);
      });      
    }
    else {
      TransferTokens.aggregate([{$match: {'send_user.company._id':req.params.company_id, time: {$gte: date_from, $lte: date_end}}}, {$group: {_id:{sender: '$send_user._id', first_name: '$send_user.first_name', last_name: '$send_user.last_name'}, total: {$sum: '$number_of_tokens'}}}, {$limit: 10}], function(err, res1) {
        if (err) return console.log(err);
        res.json(res1);
      });      
    }
  })
  //get most received point user
  app.get('/get_most_received_point_user/:company_id/:department_id/:date_from/:date_end', function(req, res) {
    var date_from = new Date(req.params.date_from);
    var date_end = new Date(req.params.date_end);
    if (req.params.department_id != "undefined") {
      TransferTokens.aggregate([{$match: {'receive_user.company._id':req.params.company_id, 'receive_user.department._id':req.params.department_id, time: {$gte: date_from, $lte: date_end}}}, {$group: {_id:{receiver: '$receive_user._id', first_name: '$receive_user.first_name', last_name: '$receive_user.last_name'}, total: {$sum: '$number_of_tokens'}}}, {$limit: 10}], function(err, res1) {
        if (err) return console.log(err);
        res.json(res1);
      });      
    }
    else {
      TransferTokens.aggregate([{$match: {'receive_user.company._id':req.params.company_id, time: {$gte: date_from, $lte: date_end}}}, {$group: {_id:{receiver: '$receive_user._id', first_name: '$receive_user.first_name', last_name: '$receive_user.last_name'}, total: {$sum: '$number_of_tokens'}}}, {$limit: 10}], function(err, res1) {
        if (err) return console.log(err);
        res.json(res1);
      });            
    }
  })
  //get user for analytic
  app.get('/get_user_for_analytic/:company_id/:department_id/:date_from/:date_end', function(req, res) {
    if (req.params.department_id === "undefined"){
      User.find({'company._id': req.params.company_id}, function(err, users){
        if (err) return console.log(err);
        UserLogOns.find({company_id: req.params.company_id}, function(err_log_ons, user_log_ons){
          if (err_log_ons) return console.log(err_log_ons);
          res.json({
            users: users,
            user_log_ons: user_log_ons
          });
        });
      })      
    }
    else {
      User.find({'company._id': req.params.company_id, 'department._id': req.params.department_id}, function(err, users){
        if (err) return console.log(err);
        UserLogOns.find({company_id: req.params.company_id, department_id: req.params.department_id}, function(err_log_ons, user_log_ons){
          if (err_log_ons) return console.log(err_log_ons);
          res.json({
            users: users,
            user_log_ons: user_log_ons
          });
        });
      })            
    }
  })
  // all other routes are handled by Angular
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });

  app.listen(app.get('port'), function() {
    console.log('Angular 2 Full Stack listening on port '+app.get('port'));
  });
});


module.exports = app;
