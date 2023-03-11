import image2 from "./default_profile_picture.png";
import { useState, useEffect } from "react";
import { formatDistance, subDays } from "date-fns";

import "./comments.scss";
//get use info

function Comment({ postId, posterId, commentorId, message, createdAt }) {
  const [name, setName] = useState("Loading");
  const [image, setImage] = useState(image2);
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
    console.log("comment id: " + data.name);
    if (data.status === "Ok") {
      setName(data.name);
      // setImage(data.picture);
    } else {
      alert(data.error);
    }
  }
  return (
    <div id="otherUsers">
      <div id="commentInfo">
        <div id="NameAndTimeAndImage">
          <img
            id="commentSectionImage"
            height="32"
            width="32"
            src={image}
          ></img>
          <div id="namemessageBlock" style={{ display: "block" }}>
            <div id="NameAndTime">
              <p id="commentSectionName">{name}</p>
              <time id="postCommentsDate">
                {formatDistance(new Date(createdAt), new Date(), {
                  addSuffix: true,
                })}
              </time>
            </div>
            <div id="commentMessage">
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Comment;
