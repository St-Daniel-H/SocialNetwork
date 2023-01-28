import './RegistrationStyle.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
function login(){

    return(
       <div className="LoginPage">
          <div id="picture">
          </div>
          <form>
            <h1>Register Now!</h1>
            <div id="inputs">
            <TextField
            className="userInfo" 
            id="standard-basic"  
            label="Email"  
            variant="standard"
            inputProps={{style: {fontSize: 30}}} 
            inputlabelprops={{style: {fontSize: 5}}}
            />
            <TextField className="userInfo" id="outlined-basic"  label="Password" variant="standard"
            type="password"
             inputProps={{style: {fontSize: 30}}} 
             inputlabelprops={{style: {fontSize: 5}}} />
            <div><Button variant="contained"
            ><p>Log In</p></Button></div>
      
         <div> <Button id="NewAcc" variant="contained"><p>Create New Account</p></Button></div>
          </div>
          </form>
        </div>
    )
}
export default login