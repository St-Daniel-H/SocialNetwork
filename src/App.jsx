import  React from 'react';
import {Route, Link, Routes} from 'react-router-dom'
//import login from './FrontEnd/login/login';
{/* <Route exact path ="/" element = {<login/>} /> */}
import SignUp from './FrontEnd/SignUp/SignUp'
function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path ="/" element = {<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;