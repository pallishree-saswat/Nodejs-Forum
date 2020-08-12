const User = require("../models/Users")
const Forum = require("../models/Forums")
const Thread = require("../models/Threads")
const Reply = require("../models/Replies")


module.exports = {
    postSignup: function (req, res) {
      req.session.userId = null;
      var user = new User({ ...req.body });
      user
        .save()
        .then(function (user) {
          req.session.userId = user._id;
          req.session.userName=user.name
          console.log("signed up successfully")
          res.redirect("/forums");
        })
        .catch(function (err) {
          console.log(err);
          if (err.name === "ValidationError")
            return res.status(400).send(`Validation Error: ${err.message}`);
        });
    },
  
    postLogin: function (req, res) {
      req.session.userId = null;
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res.status(400).send("Incorrect credentials");
      User.findByEmailAndPassword(email, password)
        .then(function (user) {
          req.session.userId = user._id;
          req.session.userName=user.name
          console.log("logged in successfully")
          res.redirect("/forums");
        })
        .catch(function (err) {
          console.log(err.message);
          res.redirect("/login");
        });
    },
    logout: function (req, res) {
        if(!req.session.userId) return res.redirect("/");
        req.session.destroy();
        return res.redirect("/");
      },
    
      postForum: function (req, res) {
        var forum = new Forum({ 
          name:req.body.name,
          description:req.body.description,
          user:req.session.userId
         });
        forum
          .save()
          .then(function (forum) {
            console.log("forum created successfully")
            res.redirect("/forums");
          })
          .catch(function (err) {
            console.log(err);
            if (err.name === "ValidationError")
              return res.status(400).send(`Validation Error: ${err.message}`);
          });
      },
    
      postThread: function (req, res) {
        var thread = new Thread({ 
          name:req.body.name,
          question:req.body.question,
          userName:req.session.userName,
          forum:req.params.forumId,
          forumName:req.params.forumName
         });
        thread
          .save()
          .then(function (forum) {
            console.log("thread created successfully")
            res.redirect(`/forums/${req.params.forumId}`);
          })
          .catch(function (err) {
            console.log(err);
            if (err.name === "ValidationError")
              return res.status(400).send(`Validation Error: ${err.message}`);
          });
      },
      postReply: function (req, res) {
        var reply = new Reply({ 
          reply:req.body.reply,
          userName:req.session.userName,
          thread:req.params.threadId
         });
        reply
          .save()
          .then(function (reply) {
            console.log("thread created successfully")
            res.redirect(`/threads/${req.params.threadId}`);
          })
          .catch(function (err) {
            console.log(err);
            if (err.name === "ValidationError")
              return res.status(400).send(`Validation Error: ${err.message}`);
          });
      },
      deleteReply:function(req,res){
        Reply.findOneAndDelete({"_id":req.params.replyId}) .then(function () {
          console.log("reply deleted successfully")
          res.redirect(`/threads/${req.params.threadId}`);
        })
        .catch(function (err) {
          console.log(err);
          if (err.name === "ValidationError")
            return res.status(400).send(`Validation Error: ${err.message}`);
        });
      }
    }