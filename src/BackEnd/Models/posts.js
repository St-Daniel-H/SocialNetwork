import Timestamp from "mongodb";
import mongoose from "mongoose";

// create an schema
var postSchema = new mongoose.Schema(
  {
    id: String,
    posterId: {
      type: String,
      required: true,
    },
    comments: Array,
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    likes: Array,
  },
  { timestamps: true },
  { collection: "postsData" }
);

var postModel = mongoose.model("Post", postSchema);
export default postModel;
