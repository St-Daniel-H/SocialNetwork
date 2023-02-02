import {
    Router,
    Route,
    Routes
  } from "react-router-dom";
  import Login from './FrontEnd/login/login';
  import SignUp from './FrontEnd/SignUp/register'
  import Home from './FrontEnd/Home/Home'
function Apps(){

    return(
    <div>
         <Routes>
          <Route  path='/login' element={<Login/>} />
          <Route  path='/signup' element={<SignUp/>} />
          <Route  path='/home' element={<Home/>} />
        </Routes>
    </div>
    )
}
export default Apps;