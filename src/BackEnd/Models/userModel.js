import mongoose from "mongoose";
// create an schema
const User = new mongoose.Schema(
  {
    id: String,
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: "",
    },
    picture: {
      type: String,
      default: "default_profile_picture.png",
    },
    friendsIds: Array,
    postsIds: Array,
  },
  { timestamps: true },
  { collection: "userData" }
);

var userModel = mongoose.model("User", User);

export default userModel;
