import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
        email:req.body.email
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

app.use("*", (req, res) => {
  res.status(404).json({
    error: "not found!",
  });
});

export default app;
