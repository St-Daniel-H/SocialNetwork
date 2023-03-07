import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./commentsDrawer.scss";
import image from "./default_profile_picture.png";
function CommentSection({ comments, trigger, setTrigger }) {
  let name = useSelector((state) => state.user.user_name);
  return trigger ? (
    <div id="commentSection">
      <div id="comments">
        <div id="commentsWrap">
          <button
            id="closeComments"
            onClick={() => {
              document.body.style.overflow = "unset";
              setTrigger(false);
            }}
          >
            close
          </button>
          <div id="otherUsers">
            <div id="commentInfo">
              <img height="32" width="32" src={image}></img>
            </div>
            <div id="commentMessage"></div>
          </div>
          <div id="addComment">
            <div id="commentUserInfo">
              <img
                id="userImageComment"
                height="32"
                width="32"
                src={image}
              ></img>
              <p>{name}</p>
            </div>
            <div id="commentTextField">
              <input type="text"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
export default CommentSection;
