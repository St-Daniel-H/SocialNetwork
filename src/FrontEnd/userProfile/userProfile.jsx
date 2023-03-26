import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userDefaultImage from "../Home/default_profile_picture.png";
import { useSelector } from "react-redux";
import "./UserProfile.scss";
import CloseIcon from "@mui/icons-material/Close";

import EditIcon from "@mui/icons-material/Edit";
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

  let screen_user_Id = useSelector((state) => state.user.user_id);
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

  useEffect(() => {
    getUserNameAndImage();
    console.log(image);
  }, []);
  console.log(id);
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

        <h1>{name}</h1>
        <p>{bio}</p>
      </div>
      <div id="rightSide"></div>
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
