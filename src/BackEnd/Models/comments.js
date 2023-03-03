const mongoose = require("mongoose");

// create an schema
var commentsSchema = new mongoose.Schema(
  {
    id: Number,
    postsId: Number,
    commentorId: Number,
  },
  { collection: "commentsData" }
);

var commentsModel = mongoose.model("comments", commentsSchema);

module.exports = commentsModel;
