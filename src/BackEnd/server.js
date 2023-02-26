import express from "express";
import cors from "cors";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
import mongoose from "mongoose";
import userModel from "./Models/userModel.js";
import jwt from 'jsonwebtoken'
app.post("/api/register", async (req, res) => {
  try {
    await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.json({ status: "Ok" });
  } catch (err) {
    res.json({ status: "error, duplicate email!" });
  }
  console.log(req.body);
});
app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const account = await userModel.findOne({email: email, password: password});
  if (account) {
    const token = jwt.sign(
      {
        id: account._id
      },
      'secret123'
    )
    res.json({
        status: "Ok",user:token
      });
     }else{
      res.json({
        status: "Failed",user:false
      })
     }
  
});

app.get("/api/home", async (req, res) => {

  const token = req.headers['x-access-token'];
  try{
    const decoded = jwt.verify(token, 'secret123');
    const id = decoded.id;
    const user = await userModel.findById(id);
    console.log(user);
    return res.json({
      status:"Ok",
      name: user.name,
      picture:user.picture
    })
  }
  catch(error){
   console.log(error);
   res.json({
    status:"error2",error:"invalid token"
   })
  }
});
app.post("/api/home", async (req, res) => {

  const token = req.headers['x-access-token'];
  try{
    const decoded = jwt.verify(token, 'secret123');
    const id = decoded.id;
    console.log("id:"+ id)
    await userModel.findOneAndUpdate(
      {_id:id},
      {name: req.body.name}
    )
    return res.json({status:"Ok"});
   }
  catch(error){
   console.log(error);
   res.json({
    status:"error1",error:"invalid token"
   })
  }
});

app.use("*", (req, res) => {
  res.status(404).json({
    error: "not found!",
  });
});

export default app;
