const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const Schema = mongoose.Schema

const  userSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        unique: true,
        type: String,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
        trim: true
      },
    },
    { timestamps: true }
  );

  userSchema.statics.findByEmailAndPassword = function(email, password) {
    var userObj = null;
    return new Promise(function(resolve, reject) {
      User.findOne({ email: email })
        .then(function(user) {
          if (!user) reject("Incorrect credentials");
          userObj = user;
          return bcrypt.compare(password, user.password);
        })
        .then(function(isMatched) {
          if (isMatched===false) reject("Incorrect credentials");
          resolve(userObj);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  };

  userSchema.pre("save", function(next) {
    var user = this;
    if (user.isModified("password")) {
      bcrypt
        .hash(user.password, 10)
        .then(function(hashedPassword) {
          user.password = hashedPassword;
          next();
        })
        .catch(function(err) {
          next(err);
        });
    }
    else{
      next();
    }
    
  });

  
  const User = mongoose.model("user", userSchema);
  
  module.exports = User;
  