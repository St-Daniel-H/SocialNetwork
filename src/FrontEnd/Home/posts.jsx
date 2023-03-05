import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { formatISO9075, format } from "date-fns";
import { useState, useEffect } from "react";
import "./posts.scss";
import { Link } from "react-router-dom";
import userDefaultImage from "./default_profile_picture.png";
import image from "../login/picture.jpg";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import SwipeableEdgeDrawer from "./commentsDrawer";

function Posts({
  _id,
  title,
  summary,
  cover,
  posterId,
  createdAt,
  likes,
  comments,
}) {
  const [likesCount, setLikesCount] = useState(likes.length);
  const [selected, setSelected] = useState(true);
  console.log("hi");
  const [name, setName] = useState("Unavailable");
  const [image, setImage] = useState("");
  const userId = useSelector((state) => state.user.user_id);
  //for like button
  async function addRemoveLike() {
    if (selected) {
      setLikesCount(likesCount - 1);
      const req = await fetch("http://localhost:5000/post/dislike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          postId: _id,
        }),
      });
    } else {
      setLikesCount(likesCount + 1);
      const req = await fetch("http://localhost:5000/post/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          postId: _id,
        }),
      });
    }
  }
  //ent for likes
  //for comments
  const [selectedcomments, setselectedcomments] = useState(false);
  //end for comments
  useEffect(() => {
    getUserNameAndImage();
    console.log(userId);
    console.log("likes at " + likes[0]);
    console.log(likes.includes(userId) + "did he like it");
    if (likes.includes(userId)) {
      setSelected(true);
      console.log(selected + "its true");
    } else {
      setSelected(false);
      console.log(selected + "it is false");
    }
  }, []);
  async function getUserNameAndImage() {
    const req = await fetch("http://localhost:5000/api/FindUserId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: posterId,
      }),
    });
    const data = await req.json();
    if (data.status === "Ok") {
      setName(data.name);
      setImage(data.picture);
    } else {
      alert(data.error);
    }
  }
  return (
    <div id="postCard">
      <div id="postUserInfo">
        <Link to={"/user/" + posterId}>
          {" "}
          <img id="PosterImage" src={userDefaultImage}></img>
        </Link>
        <div id="posterNameAndDate">
          <Link to={"/user/" + posterId}>
            <h4 id="PosterName">{name}</h4>
          </Link>
          <time id="postDate">
            {format(new Date(createdAt), "MMM d, yyyy HH:mm")}
          </time>
        </div>
      </div>
      <div id="title">
        <h4>{title}</h4>
      </div>
      <div id="Summary">
        <p>{summary}</p>
      </div>
      {cover && (
        <div id="image">
          {" "}
          <img src={cover}></img>
        </div>
      )}
      <div id="buttons">
        <div id="like">
          <div>
            <ToggleButton
              id="likeButton"
              style={
                selected
                  ? {
                      color: "#9c27b0",
                    }
                  : {
                      color: "white",
                      ":hover": {
                        cursor: "pointer",
                        color: "#9c27b0",
                      },
                    }
              }
              color="secondary"
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
                addRemoveLike();
              }}
            >
              <ThumbUpOffAltIcon />
            </ToggleButton>
            {/* <button className="postButtons" id="like" onClick={LikePost()}>
              <ThumbUpOffAltIcon />
            </button> */}
          </div>
          <div>
            <p>{likesCount}</p>
          </div>
        </div>
        {/* <div id="borderBetweenLikeAndComment"></div> */}
        <div id="comment">
          <div>
            {/* <ToggleButton
              id="commentsButton"
              style={
                selectedcomments
                  ? {
                      color: "#9c27b0",
                    }
                  : {
                      color: "white",
                      ":hover": {
                        cursor: "pointer",
                        color: "#9c27b0",
                      },
                    }
              }
              color="secondary"
              value="check"
              selected={selectedcomments}
              onChange={() => {
                setselectedcomments(!selectedcomments);
              }}
            > */}
            <Button id="commentsButton" color="secondary" variant="text">
              <ChatBubbleOutlineIcon />
            </Button>

            {/* </ToggleButton> */}
            {/* <SwipeableEdgeDrawer /> */}
          </div>
          {/* <button className="postButtons">
            <ChatBubbleOutlineIcon />
          </button> */}
          <div>
            <p>{comments.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Posts;
