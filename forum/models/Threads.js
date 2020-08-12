const mongoose = require("mongoose")
const Schema = mongoose.Schema

var threadSchema = new Schema(
    {
      name:{
        type:String,
        required:true
      },
      question: {
        type: String,
        required: true
      },
      userName:{
        type:String,
      },
      forum:{
          type:Schema.Types.ObjectId,
          ref:"forum"
      },
      forumName:{
        type:String
    }
    },
    { timestamps: true }
  );


  var Thread = mongoose.model("thread", threadSchema);
  
  module.exports = Thread;