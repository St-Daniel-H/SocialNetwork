const mongoose = require("../database");
 
// create an schema
var userSchema = new mongoose.Schema({
            id: Number,
            name: {
                data:String,
                required: true
            },
            password:{
                data:String,
                required: true
            },
            email:{
                data:String,
                required: true
            },
            friendsIds:Array,
            postsIds:Array
        });
 
var userModel=mongoose.model('Users',userSchema);
 
module.exports =userModel