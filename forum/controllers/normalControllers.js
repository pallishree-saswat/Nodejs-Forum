const Forum = require("../models/Forums")
const Thread = require("../models/Threads")
const Reply = require("../models/Replies")



module.exports = {
    renderSignup: function (req, res) {
      if (req.session.userId) res.redirect("/allforums")
      res.render("signup")
    },
  
    renderLogin: function (req, res) {
      if (req.session.userId) res.redirect("/allforums")
      res.render("login")
    },
    renderAllForums:function (req,res){
        Forum.find({}).then(function(forums){
          return res.render("forums",{
            loggedIn:req.session.userId,
            userName:req.session.userName,
            forums:forums
          })
        })
      },
      renderForumCreate:function (req,res){
        res.render("forumCreate",{
          userName:req.session.userName,
          loggedIn:req.session.userId
        })
      },
      renderForum:function (req,res){
        var test= "disabled";
        Forum.findById(req.params.forumId).then(function(forum){
          if(req.session.userId) test=null;
          Thread.find({forum:forum.id}).then(function(threads){
            return res.render("forum",{
              loggedIn:req.session.userId,
              userName:req.session.userName,
              forum:forum,
              test:test,
              threads:threads
              
            })
          })
          
        })
      },
      renderAllThreads:function(req,res){
        var forumObj= null;
        Forum.findById(req.params.forumId).then(function(forum){
           forumObj=forum;
        Thread.find({}).then(function(threads){
          return res.render("threads",{
            loggedIn:req.session.userId,
            userName:req.session.userName,
            threads:threads,
            forum:forumObj
          })
        })
      })
      },
      renderThreadCreate:function(req,res){
        Forum.findById(req.params.forumId).then(function(forum){
          return res.render("threadCreate",{
            loggedIn:req.session.userId,
            userName:req.session.userName,
            forum:forum,
          })
        })
      },
      renderThread:function(req,res){
        Thread.findById(req.params.threadId).then(function(thread){
          Forum.findById(thread.forum).then(function(forum){
            Reply.find({thread:thread.id}).then(function(replies){
              return res.render("thread",{
                loggedIn:req.session.userId,
                userName:req.session.userName,
                thread:thread,
                forum:forum,
                replies:replies,
                threadId:req.params.threadId
              })
            })
          })
        })
      }
    }
