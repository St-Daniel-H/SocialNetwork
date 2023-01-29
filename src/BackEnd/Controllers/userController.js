import app from '../server.js';
import user from '../Models/user.js';
import mongodb from 'mongodb';

const findUserByEmail = function(userEmail,done){
    user.find({email: userEmail},function(err,userFound){
        if(userFound) return true;
        else return false;
    })
   }
    const createAndSaveUser = (done,name,email,password) =>{
      if(findUserByEmail(email)){
        return alert("User by this email already exists");
      }else{
        const user = new user({name: name, email: email, password: password})
        user.save(function(err,data){
            if (err) return console.log(err);
            done(null,data);
        });
      }
     }