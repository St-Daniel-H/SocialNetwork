import { useState } from "react";
import { useSelector } from "react-redux";
import "./createPost.scss";
import CloseIcon from "@mui/icons-material/Close";

function CreatePost({ trigger, setTrigger }) {
  const [title, setTitle] = useState("Title");
  const [summary, setSummary] = useState("Summary");
  const [file, setFile] = useState("");
  const id = useSelector((state) => state.user.user_id);

  async function createNewPost(ev) {
    console.log(id);
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("file", file[0]);
    data.set("posterId", id);
    console.log(file);
    const response = await fetch("http://localhost:5000/createPost", {
      method: "POST",
      body: data,
    });
    if (response.status == "Ok") {
      alert("Posted");
    }
    window.location.reload();
  }
  return trigger ? (
    <form onSubmit={createNewPost} id="CreatePost">
      <div id="titleandbutton">
        <h1>What's on your mind?</h1>{" "}
        <button
          id="closeComments"
          onClick={() => {
            document.body.style.overflow = "unset";
            setTrigger(false);
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div id="createPostForm">
        <input
          placeholder="Title"
          valye={title}
          onChange={(ev) => setTitle(ev.target.value)}
          type="text"
          className="inputCreatePost"
        ></input>

        <textarea
          placeholder="Summary"
          valye={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          className="inputCreatePost"
          rows="5"
          cols="10"
          wrap="hard"
          maxLength="300"
        ></textarea>

        <input
          onChange={(ev) => setFile(ev.target.files)}
          placeholder="Image"
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
        ></input>

        <button type="submit">Create Post</button>
      </div>
    </form>
  ) : (
    ""
  );
}
export default CreatePost;
