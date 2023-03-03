import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
// import {  } from "react-router-dom"
import "./SignUpSt.scss";
import userModel from "../../BackEnd/Models/userModel";
import { AltRoute } from "@mui/icons-material";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status == "Ok") {
      navigateTo("/login");
    } else {
      alert("Error, duplicated email");
    }
  }
  return (
    <div className="LoginPage">
      <div id="picture"></div>
      <form className="signup-loginform" onSubmit={registerUser}>
        <div className="glitch-wrapper">
          <div className="glitch" data-glitch="SignUp ">
            Sign Up!
          </div>
        </div>
        <div id="inputs">
          <TextField
            sx={{
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiFormLabel-root": {
                color: "white",
              },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="userInfo"
            id="standard-basic"
            label="Name"
            variant="standard"
            color="secondary"
            inputProps={{ style: { fontSize: 30 } }}
            inputlabelprops={{ style: { fontSize: 5 } }}
            required
          />
          <TextField
            sx={{
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiFormLabel-root": {
                color: "white",
              },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="userInfo"
            id="standard-basic"
            label="Email"
            variant="standard"
            color="secondary"
            inputProps={{ style: { fontSize: 30 } }}
            inputlabelprops={{ style: { fontSize: 5 } }}
            required
          />
          <TextField
            sx={{
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiFormLabel-root": {
                color: "white",
              },
            }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="userInfo"
            id="outlined-basic"
            label="Password"
            variant="standard"
            type="password"
            color="secondary"
            inputProps={{ style: { fontSize: 30 } }}
            inputlabelprops={{ style: { fontSize: 5 } }}
            required
          />
          <div>
            <Button
              color="secondary"
              type="submit"
              value="Register"
              variant="contained"
            >
              <p>Sign Up!</p>
            </Button>
          </div>
          <hr />
          <div id="signup">
            <p>Already have an account? Log in!</p>
            <a href="../login">
              {" "}
              <Button id="loginButton">
                <p>logIn</p>
              </Button>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
