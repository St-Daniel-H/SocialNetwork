import mongoose from 'mongoose'; 
// create an schema
const User = new mongoose.Schema({
            id: String,
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
            bio:{
                type:String
            },
            friendsIds:Array,
            postsIds:Array
        },
        {collection: 'userData'});
 
var userModel=mongoose.model('User',User);
 
export default userModel
