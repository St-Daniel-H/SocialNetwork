import mongoose from "mongoose";

// create an schema
var commentsSchema = new mongoose.Schema(
  {
    id: String,
    commentorId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    replies: Array,
  },
  { timestamps: true },
  { collection: "commentsData" }
);

var commentsModel = mongoose.model("comments", commentsSchema);

export default commentsModel;
