import {
    Router,
    Route,
    Routes
  } from "react-router-dom";
  import Login from './FrontEnd/login/login';
  import SignUp from './FrontEnd/SignUp/register'
function Apps(){

    return(
    <div>
         <Routes>
          <Route  path='/' element={<Login/>} />
          <Route  path='/signup' element={<SignUp/>} />
        </Routes>
    </div>
    )
}
export default Apps;