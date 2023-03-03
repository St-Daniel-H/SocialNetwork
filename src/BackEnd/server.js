import express from "express";
import cors from "cors";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
import mongoose from "mongoose";
import userModel from "./Models/userModel.js";
import jwt from "jsonwebtoken";

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

  const account = await userModel.findOne({ email: email, password: password });
  if (account) {
    const token = jwt.sign(
      {
        id: account._id,
      },
      "secret123"
    );
    res.json({
      status: "Ok",
      user: token,
    });
  } else {
    res.json({
      status: "Failed",
      user: false,
    });
  }
});

app.get("/api/home", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const id = decoded.id;
    const user = await userModel.findById(id);
    console.log("this is the user" + user);
    return res.json({
      status: "Ok",
      name: user.name,
      picture: user.picture,
      id: id,
      email: user.email,
      bio: user.bio,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error2",
      error: "invalid token",
    });
  }
});
app.post("/api/home", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const id = decoded.id;
    console.log("id:" + id);
    await userModel.findOneAndUpdate({ _id: id }, { name: req.body.name });
    return res.json({ status: "Ok" });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error1",
      error: "invalid token",
    });
  }
});
//fore createPost
import postModel from "./Models/posts.js";
import multer from "multer";
import fs from "fs"; //To change the file name, this is called "file system"
const uploadMiddleWare = multer({ dest: "./src/BackEnd/Uploads/posts/" });
app.post("/createPost", uploadMiddleWare.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  res.json(req.file);
  const { title, summary, posterId } = req.body;
  const postDoc = await postModel.create({
    posterId: posterId,
    title: title,
    summary: summary,
    cover: newPath,
  });
  // res.json(postDoc)
});

app.use("*", (req, res) => {
  res.status(404).json({
    error: "not found!",
  });
});

export default app;
