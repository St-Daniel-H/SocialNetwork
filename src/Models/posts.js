const mongoose = require("../database");
 
// create an schema
var postSchema = new mongoose.Schema({
        postsId:Number,
        poster:Number,
        comments: Array
        });
 
var postModel=mongoose.model('Post',postSchema);
module.exports = postModel;