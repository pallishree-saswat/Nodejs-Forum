const mongoose = require("mongoose")
const Schema = mongoose.Schema

var forumSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        unique: true,
        type: String,
        required: true,
        trim: true
      },
      user:{
          type:Schema.Types.ObjectId,
          ref:"user"
      }
    },
    { timestamps: true }
  );


  var Forum = mongoose.model("forum", forumSchema);
  
  module.exports = Forum;