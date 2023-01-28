const mongoose = require("../database");
 
// create an schema
var commentsSchema = new mongoose.Schema({
            id:Number,
            postsId:Number,
            commentorId:Number
        });
 
var commentsModel=mongoose.model('comments',commentsSchema);
 
module.exports = commentsModel