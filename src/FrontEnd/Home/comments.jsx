import userDefaultImage from "../pictures/default.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDistance, subDays } from "date-fns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./comments.scss";
//get use info

function Comment({
  postId,
  posterId,
  commentorId,
  message,
  createdAt,
  _id,
  setComments,
  comments,
  commentsCount,
  setCommentsCount,
}) {
  const [readMore, setReadMore] = useState(false);
  const [name, setName] = useState("Loading");
  let screen_user_Id = useSelector((state) => state.user.user_id);
  const [image, setImage] = useState("");
  console.log("comment status: " + commentorId + " and message: " + message);
  useEffect(() => {
    getUserNameAndImage();
  }, []);
  async function getUserNameAndImage() {
    const req = await fetch("http://localhost:5000/api/FindUserId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: commentorId,
      }),
    });
    const data = await req.json();
    if (data.status === "Ok") {
      setName(data.name);
      setImage("/" + data.picture);
    } else {
      alert(data.error);
    }
  }
  // For mobile 3 dots menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //delete comment
  async function DeleteComment() {
    const req = await fetch("http://localhost:5000/DeleteComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
        postId: postId,
      }),
    });
    const data = await req.json();
    if (data.status === "Ok") {
      alert("comment deleted");
      const indexOfComment = comments.findIndex((i) => i._id === _id);
      setComments(
        comments.filter((x) => x._id !== comments[indexOfComment]._id)
      );
      setCommentsCount((commentsCount) => commentsCount - 1);
    } else {
      alert(data.error);
    }
  }
  const handleCloseAndDelete = () => {
    setAnchorEl(null);
    DeleteComment();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //
  return (
    <div id="otherUsers">
      <div id="commentInfo">
        <div id="NameAndTimeAndImage">
          <img
            id="commentSectionImage"
            height="32"
            width="32"
            src={image == "/" ? userDefaultImage : image}
          ></img>
          <div id="namemessageBlock" style={{ display: "block" }}>
            <div id="NameAndTime">
              <p id="commentSectionName">{name}</p>
              <div id="timeandthreedots">
                <time id="postCommentsDate">
                  {formatDistance(new Date(createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </time>
                {commentorId == screen_user_Id && (
                  <div id="threedots">
                    {" "}
                    <div
                      className="toolcase"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </div>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleCloseAndDelete}>
                        Delete{" "}
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Edit </MenuItem>
                    </Menu>{" "}
                  </div>
                )}
              </div>
            </div>
            <div id="commentMessage">
              {message.length > 100 && readMore == false ? (
                <p>
                  {message.substring(0, 100)}{" "}
                  <button
                    onClick={() => {
                      setReadMore(true);
                      console.log(readMore);
                    }}
                    className="readMore"
                  >
                    read more
                  </button>
                </p>
              ) : message.length > 100 && readMore == true ? (
                <p>
                  {message}{" "}
                  <button
                    onClick={() => {
                      setReadMore(false);
                      console.log(readMore);
                    }}
                    className="readMore"
                  >
                    read less
                  </button>
                </p>
              ) : (
                <p> {message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Comment;
