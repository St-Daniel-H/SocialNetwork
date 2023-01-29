const mongoose = require("mongoose");
 
// create an schema
var postSchema = new mongoose.Schema({
        postsId:Number,
        poster:Number,
        comments: Array
        },
         {collection: 'postsData'});
 
var postModel=mongoose.model('Post',postSchema);
module.exports = postModel;