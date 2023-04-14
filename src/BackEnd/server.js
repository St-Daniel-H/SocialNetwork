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
    // console.log("this is the user" + user);
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
  try {
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
      const addPostForUser = await userModel.findOneAndUpdate(
        { _id: posterId },
        { $addToSet: { postsIds: postDoc._id } }
      );
    } else {
      const { title, summary, posterId } = req.body;
      const postDoc = await postModel.create({
        posterId: posterId,
        title: title,
        summary: summary,
      });
      const addPostForUser = await userModel.findOneAndUpdate(
        { _id: posterId },
        { $addToSet: { postsIds: postDoc._id.toString() } }
      );
    }

    res.json({ status: "Ok" });
  } catch (err) {
    console.log(err);
  }

  // res.json(postDoc)
});
app.post("/DeletePost", async (req, res) => {
  try {
    const post = await postModel.findById(req.body.postId);
    const comments = post.comments;
    await commentsModel.deleteMany({ _id: { $in: comments } });
    const user = userModel.findById(req.body.posterId);

    const removePost = await userModel.findOneAndUpdate(
      { _id: req.body.posterId },
      { $pull: { postsIds: req.body.postId } }
    );

    await postModel.findByIdAndDelete(req.body.postId);
    res.json({ status: "Ok" });
  } catch (err) {
    console.log(err);
  }
});
//get the posts
app.get("/posts", async (req, res) => {
  res.json(await postModel.find().sort({ createdAt: -1 }).limit(20));
});

app.post("/api/FindUserId", async (req, res) => {
  const id = req.body.id;
  try {
    const user = await userModel.findById(id);
    // console.log("this is the user" + user);
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
  try {
    const post = await postModel.findByIdAndUpdate(
      { _id: postId },
      { $addToSet: { likes: userId } }
    );
  } catch (error) {
    console.log(error);
  }
});
//get likes
app.post("/api/getPostLikes", async (req, res) => {
  const likes = await postModel.findById(req.body.postId);
  // console.log("from backend" + likes.likes);
  res.json({
    likes: likes.likes,
    comments: likes.comments,
    status: "Ok",
  });
});
//get comments
import commentsModel from "./Models/comments.js";
app.post("/getComments", async (req, res) => {
  const ids = req.body.commentsId;
  const comments = await commentsModel
    .find({ _id: { $in: ids } })
    .sort({ createdAt: -1 });
  res.json({
    status: "Ok",
    comments: comments,
  });
});
//post comment
app.post("/api/Comment", async (req, res) => {
  try {
    const comment = await commentsModel.create({
      commentorId: req.body.commentorId,
      postId: req.body.postId,
      message: req.body.message,
    });
    await postModel.findOneAndUpdate(
      { _id: req.body.postId },
      { $addToSet: { comments: comment._id.toString() } }
    );
    res.json({ status: "Ok", comment: comment });
  } catch (err) {
    res.json({ status: err });
  }
});
app.post("/DeleteComment", async (req, res) => {
  try {
    await commentsModel.findByIdAndRemove(req.body.id);
    const post = await postModel.findOneAndUpdate(
      { _id: req.body.postId },
      { $pull: { comments: req.body.id } }
    );
    res.json({ status: "Ok", post });
  } catch (err) {
    res.json({ status: err });
  }
});

//user profile
//updating user profile image
const uploadUserProfilePicture3 = multer({
  dest: "./src/BackEnd/Uploads/pictures/",
});

app.post(
  "/api/updateUserProfilePicture",
  uploadUserProfilePicture3.single("file"),
  async (req, res) => {
    // console.log("id: " + req.body.id);
    try {
      console.log(req.file);
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      const { userId } = req.body;
      const updatePicture = await userModel.findByIdAndUpdate(userId, {
        picture: newPath,
      });
      res.json({ status: "Ok" });
    } catch (err) {
      console.log(err);
    }

    // res.json(postDoc)
  }
);
//user profile
//Get user posts on their ID
app.post("/user/posts", async (req, res) => {
  const posts = await postModel
    .find({ posterId: req.body.posterId })
    .sort({ createdAt: -1 })
    .limit(20);
  res.json({
    status: "Ok",
    posts: posts,
  });
});
//check if the user is  a friend
app.post("/user/isFriend", async (req, res) => {
  try {
    const me = await userModel.findById(req.body.myId);
    if (me.friendsIds.includes(req.body.userId)) {
      res.json({ status: "Ok" });
    } else {
      res.json({ status: "Not" });
    }
  } catch (err) {
    res.json(err);
  }
});
//add friend
app.post("/user/addFiend", async (req, res) => {
  try {
    if (req.body.add == false) {
      const addFriend = await userModel.findOneAndUpdate(
        { _id: req.body.myId },
        { $addToSet: { friendsIds: req.body.newFriendId } }
      );
      res.json({ status: "Added" });
    } else if (req.body.add == true) {
      const addFriend = await userModel.findOneAndUpdate(
        { _id: req.body.myId },
        { $pull: { friendsIds: req.body.newFriendId } }
      );
      res.json({ status: "Removed" });
    }
  } catch (err) {
    res.json(err);
  }
});
//change bio
app.post("/user/changeBio", async (req, res) => {
  try {
    const changeBio = await userModel.findByIdAndUpdate(req.body.id, {
      bio: req.body.bio,
    });
    res.json({ status: "changedBio" });
  } catch (err) {
    res.json(err);
  }
});
app.get("/user/getRandomInfo/:id", async (req, res) => {
  try {
    console.log("from backend" + req.params.id);
    const user = await userModel.findById(req.params.id);
    const userFr = user.friendsIds;
    res.json({
      status: "Ok",
      friendsNum: userFr.length,
    });
  } catch (err) {
    console.log(err);
  }
});
app.use("*", (req, res) => {
  res.status(404).json({
    error: "not found!",
  });
});

export default app;
