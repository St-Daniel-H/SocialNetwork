import mongoose from 'mongoose'; 
// create an schema
const User = new mongoose.Schema({
            id: Number,
            name: {
                type:String,
                required: true
            },
            password:{
                type:String,
                required: true
            },
            email:{
                type:String,
                required: true,
                unique: true
            },
            friendsIds:Array,
            postsIds:Array
        },
        {collection: 'userData'});
 
var userModel=mongoose.model('User',User);
 
export default userModel
