import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function UserProfile() {
  const { id } = useParams();
  useEffect(() => {
    getUserInfo();
  }, []);
  const [name, setName] = useState("Unavailable");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  async function getUserInfo() {
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
      setImage(data.picture);
    } else {
      alert(data.error);
    }
  }
  console.log(id);
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
export default UserProfile;
