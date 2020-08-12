var User = require("../models/Users");

module.exports = function(req, res, next) {
  if (req.session.userId) {
    User.findById(req.session.userId)
      .then(function(user) {
        next();
      })
      .catch(function(err) {
      console.log(err.message);
        res.redirect("/");
      });
  } else res.redirect("/");
};