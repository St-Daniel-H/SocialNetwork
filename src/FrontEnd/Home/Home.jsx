import { useEffect,useHistory} from "react";
import jwt from "jsonwebtoken";
import {history} from 'react';
const homePage = () => {
  const history = useHistory();

  async function populateHome() {
    const req = await fetch("http://localhost:5000/api/home", {
      "x-access-token": localStorage.getItem('token'),
    });
    const data = req.json;
    console.log(data);
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.remove('token');
        history.replace("./login");
      } else {
        populateHome();
      }
    }
   
  }, []);

  return (
    <div>
      <h1>hey world</h1>
    </div>
  );
};
export default homePage;
