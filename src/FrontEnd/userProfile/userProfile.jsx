import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userDefaultImage from "../pictures/default.png";
import { useSelector } from "react-redux";
import "./UserProfile.scss";
import Posts from "../Home/posts";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import ToggleButton from "@mui/material/ToggleButton";

function ChangePicture({ trigger, setTrigger, image, setImage, id }) {
  const [file, setFile] = useState("");
  console.log(`image passed as parameter: ${image}`);
  async function updateUserProfilePicture(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("file", file[0]);
    data.set("userId", id);
    console.log(file);
    const req = await fetch(
      "http://localhost:5000/api/updateUserProfilePicture",
      {
        method: "POST",
        body: data,
      }
    );
    const res = await req.json();
    if (res.status === "Ok") {
      alert("Image updated");
      window.location.reload();
    } else {
      alert(res.error);
    }
  }

  return trigger ? (
    <div id="changePictureWrapper">
      <div id="changePicture">
        <h1>Change your picture here!</h1>
        <div>
          <img
            id="formChangePicImage"
            src={image == "/" ? userDefaultImage : image}
          />
          <button
            id="closeForm"
            onClick={() => {
              document.body.style.overflow = "unset";
              setTrigger(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={updateUserProfilePicture}>
          <input
            onChange={(ev) => setFile(ev.target.files)}
            placeholder="Image"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            required
          ></input>
          <button type="submit">Update profile Picture</button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}
function UserProfile() {
  const { id } = useParams();

  const screen_user_Id = useSelector((state) => state.user.user_id);
  const [name, setName] = useState("Unavailable");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  const [trigger, setTrigger] = useState(false);

  async function getUserNameAndImage() {
    const req = await fetch("http://localhost:5000/api/FindUserId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await req.json();
    if (data.status === "Ok") {
      setName(data.name);
      setImage("/" + data.picture);
      setBio(data.bio);
      console.log("the data of the picture: " + data.picture);
    } else {
      alert(data.error);
    }
  }
  //get user posts
  const [posts, setPosts] = useState([]);
  async function getUserPosts() {
    const req = await fetch("http://localhost:5000/user/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        posterId: id,
      }),
    });
    const data = await req.json();
    if (data.status == "Ok") {
      setPosts(data.posts);
    } else {
      alert("error: " + data.error);
    }
  }
  useEffect(() => {
    checkIfUserFriend();
    getUserNameAndImage();
    getUserPosts();
    console.log(image);
  }, [screen_user_Id]);
  console.log(id);
  //check if user already friends
  async function checkIfUserFriend() {
    const req = await fetch("http://localhost:5000/user/isFriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        myId: screen_user_Id,
      }),
    });
    const data = await req.json();
    if (data.status === "Ok") {
      setSelected(true);
    } else if (data.status === "Not") {
      setSelected(false);
    } else {
      alert(data.error);
    }
  }
  //addFriend button
  const [selected, setSelected] = useState(false);
  async function addRemoveFriend() {
    const req = await fetch("http://localhost:5000/user/addFiend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newFriendId: id,
        myId: screen_user_Id,
        add: selected,
      }),
    });
    const data = await req.json();
    if (data.status == "Added") {
      alert("Friend added");
    } else if (data.status == "Removed") {
      alert("Removed");
    } else {
      alert("error: " + data.error);
    }
  }
  return (
    <div id="UserProfile">
      <div id="leftSide">
        <div id="leftSideImage">
          <img
            id="userProfileImage"
            height="300px"
            width="300px"
            src={image == "/" ? userDefaultImage : image}
          ></img>
          {screen_user_Id == id ? (
            <button
              onClick={() => {
                document.body.style.overflow = "hidden";
                setTrigger(true);
              }}
            >
              <EditIcon />
            </button>
          ) : (
            ""
          )}
        </div>

        <div id="nameAddFriend">
          <h1>{name}</h1>
          {screen_user_Id !== id ? (
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
                addRemoveFriend();
              }}
            >
              <PersonAddIcon />
            </ToggleButton>
          ) : (
            ""
          )}
        </div>
        <p>{bio}</p>
      </div>
      <div id="rightSide">
        <ul style={{ listStyle: "none" }}>
          {posts.length > 0 &&
            posts.map((post) => (
              <li key={post._id}>
                <Posts {...post} userId={id} />
                <br />
              </li>
            ))}
        </ul>
      </div>
      <ChangePicture
        image={image}
        setImage={setImage}
        trigger={trigger}
        setTrigger={setTrigger}
        id={id}
      />
    </div>
  );
}
export default UserProfile;
