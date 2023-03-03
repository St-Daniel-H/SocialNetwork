import "./LoginStyle.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { AltRoute } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login Successful");
      window.location.href = "/home";
    } else {
      alert("Please check your email and password");
    }
    console.log(data);
  }
  return (
    <div className="LoginPage">
      <div id="picture"></div>
      <form className="signup-loginform" onSubmit={loginUser}>
        <div className="glitch-wrapper">
          <div className="glitch" data-glitch="Login In">
            Login In
          </div>
        </div>

        <div id="inputs">
          <div>
            {" "}
            <TextField
              sx={{
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiFormLabel-root": {
                  color: "white",
                },
              }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="userInfo"
              id="standard-basic"
              label="Email"
              variant="standard"
              color="secondary"
              inputProps={{ style: { fontSize: 30, color: "white" } }}
              inputlabelprops={{ style: { fontSize: 5 } }}
            />
          </div>
          <div>
            <TextField
              sx={{
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiFormLabel-root": {
                  color: "white",
                },
              }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              color="secondary"
              className="userInfo"
              id="outlined-basic"
              label="Password"
              variant="standard"
              type="password"
              inputProps={{ style: { fontSize: 30, color: "white" } }}
              inputlabelprops={{ style: { fontSize: 5 } }}
            />
          </div>
          <div id="login">
            <Button type="submit" id="loginButton">
              <p>Log In</p>
            </Button>
          </div>
          <hr />
          <div id="signup">
            <p>Don't have an account? Sign up!</p>
            <a href="../signup">
              <Button id="signupButton">
                <p>Create New Account</p>
              </Button>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Login;
