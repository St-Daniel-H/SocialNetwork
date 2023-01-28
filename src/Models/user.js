const mongoose = require("../database");
 
// create an schema
var userSchema = new mongoose.Schema({
            id: Number,
            name: String,
            password: String,
            email:String,
            friendsIds:Array,
            postsIds:Array
        });
 
var userModel=mongoose.model('Users',userSchema);
 
module.exports =userModel