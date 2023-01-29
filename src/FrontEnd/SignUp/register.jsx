import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import './SignUpSt.scss';
function SignUp(){
   const [name,setName]=useState("");
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   async function registerUser (event){
    event.preventDefault();
   const response = await fetch('http://localhost:5000/api/register', {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      password
    }),
   })
   const data = await response.json();
   console.log(data); 
   }
    return(
      <div className="LoginPage">
      <div id="picture">
      </div>
      <form onSubmit={registerUser}>
        <h1>Sign Up Now!</h1>
        <div id="inputs">

        <TextField
        value = {name}
        onChange = {(e)=> setName(e.target.value) }
        className="userInfo" 
        id="standard-basic"  
        label="Name"  
        variant="standard"
        inputProps={{style: {fontSize: 30}}} 
        inputlabelprops={{style: {fontSize: 5}}}
        required/>
        <TextField
        value={email}
        onChange = {(e)=> setEmail(e.target.value) }
        className="userInfo" 
        id="standard-basic"  
        label="Email"  
        variant="standard"
        inputProps={{style: {fontSize: 30}}} 
        inputlabelprops={{style: {fontSize: 5}}}
        required/>
        <TextField 
          onChange = {(e)=> setPassword(e.target.value) }
        value={password} className="userInfo" id="outlined-basic"  label="Password" variant="standard"
        type="password"
         inputProps={{style: {fontSize: 30}}} 
         inputlabelprops={{style: {fontSize: 5}}} required/>
        <div><Button type=
         "submit" value="Register" variant="contained"
        ><p>Sign Up!</p></Button></div>
        </div>
      </form>
    </div>
    )
}
export default SignUp;