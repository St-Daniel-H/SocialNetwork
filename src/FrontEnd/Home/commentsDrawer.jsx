import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./commentsDrawer.scss";
import image from "./default_profile_picture.png";
import Comment from "./comments";
function CommentSection({ commentsId, trigger, setTrigger, postId }) {
  //get comments from database that have the same commentsIds in the array commentsId
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  // async function getComments() {
  //   console.log("coomments array" + commentsId);
  //   const req = await fetch("http://localhost:5000/getComments", {
  //     method: "POST",
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       commentsId: commentsId,
  //     }),
  //   });
  //   const comments = await req.json();
  //   if (comments.status === "Ok") {
  //     setComments(comments.comments);
  //     console.log("comments:" + comments);
  //   } else {
  //     alert(comments.error);
  //   }
  // }
  async function getComments() {
    const response = await fetch("http://localhost:5000/getComments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentsId: commentsId,
      }),
    });
    const comments = await response.json();
    if (comments.status === "Ok") {
      setComments(comments.comments);
      console.log("comments:" + comments);
    } else {
      alert(comments.error);
    }
  }
  async function postComment(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/Comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        commentorId: userid,
        message: message,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status == "Ok") {
      console.log("sucsses");
      setComments(data);
    } else {
      alert("Error");
    }
    window.location.reload();
  }
  const name = useSelector((state) => state.user.user_name);
  const userid = useSelector((state) => state.user.user_id);
  useEffect(() => {
    getComments();
  }, []);
  console.log(comments);
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
          <div id="commentsbyotherusers">
            <ul style={{ listStyle: "none" }}>
              {comments.length > 0 &&
                comments.map((comment) => (
                  <li key={comment._id}>
                    <Comment {...comment} />
                    <br></br>
                  </li>
                ))}
            </ul>
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
              <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                required
              ></input>
              <button onClick={postComment}>Submit</button>
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
