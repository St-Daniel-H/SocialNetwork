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
  if (req.file) {
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
  } else {
    const { title, summary, posterId } = req.body;
    const postDoc = await postModel.create({
      posterId: posterId,
      title: title,
      summary: summary,
    });
  }

  // res.json(postDoc)
});
//get the posts
app.get("/posts", async (req, res) => {
  res.json(await postModel.find().sort({ createdAt: -1 }).limit(20));
});

app.post("/api/FindUserId", async (req, res) => {
  const id = req.body.id;
  console.log("id:" + id);
  try {
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

//dislike a post
app.post("/post/dislike", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  console.log("i disliked");

  try {
    const post = await postModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { likes: userId } }
    );
  } catch (error) {
    console.log(error);
  }
});
//like post
app.post("/post/like", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  console.log("i liked");
  try {
    const post = await postModel.findOneAndUpdate(
      { _id: postId },
      { $push: { likes: userId } }
    );
  } catch (error) {
    console.log(error);
  }
});
app.use("*", (req, res) => {
  res.status(404).json({
    error: "not found!",
  });
});

export default app;
