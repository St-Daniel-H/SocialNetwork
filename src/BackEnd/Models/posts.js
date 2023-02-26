const mongoose = require("mongoose");
 
// create an schema
var postSchema = new mongoose.Schema(
  {
    postsId: {
      type: Number,
      required: true,
    },
    posterId: {
      type: Number,
      required: true,
    },
    comments: Array,
    title: {
      type: String,
      required: true,
    },
    summary:{
        type:String,
        required:true
    } 
  },
  { collection: "postsData" }
);
 
var postModel=mongoose.model('Post',postSchema);
module.exports = postModel;