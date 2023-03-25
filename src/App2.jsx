import { Router, Route, Routes } from 'react-router-dom';
import Login from './FrontEnd/login/login';
import SignUp from './FrontEnd/SignUp/register';
import Home from './FrontEnd/Home/Home';
import UserProfile from './FrontEnd/userProfile/userProfile';
// import TopBar from "./FrontEnd/Home/topBar/topBar";
import CreatePost from './FrontEnd/createPost/createPost';
import Test from './FrontEnd/testingRedux';
import { useState, useEffect, useHistory } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { getUserData } from './FrontEnd/Redux/actions/types';
function Apps() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  async function populateHome() {
    const req = await fetch('http://localhost:5000/api/home', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
    const data = await req.json();
    console.log('data: ' + data.name);
    if (data.status === 'Ok') {
      dispatch({
        type: getUserData,
        name: data.name,
        picture: data.picture,
        id: data.id,
        bio: data.bio,
        email: data.email,
      });
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);
      console.log(user);
      if (!user) {
        localStorage.remove('token');
        history.replace('./login');
      } else {
        populateHome();
      }
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Home />} />
        {/* <Route path="/topbar" element={<TopBar />} /> */}
        <Route path='/test' element={<Test />} />
        <Route path='/user/:id' element={<UserProfile />} />
      </Routes>
    </div>
  );
}
export default Apps;
