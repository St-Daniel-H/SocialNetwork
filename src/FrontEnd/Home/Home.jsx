import { useState,useEffect,useHistory} from "react";
import jwt_decode from "jwt-decode";
import './HomeStyle.scss';
const homePage = () => {
  const [name,setName] = useState('');
  const [tempName,setTempName] = useState('');
  async function populateHome() {
    const req = await fetch("http://localhost:5000/api/home", {
      headers:{
        "x-access-token": localStorage.getItem('token'),
      }
   
    });
    const data = await req.json();
    console.log("data: " + data.name);
    if(data.status === 'Ok'){
      setName(data.name);
    }else{
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
          history.replace("./login");
        } else {
          populateHome();
        }
      }
     
    }, []);
    async function updateName(event) {
      event.preventDefault();
    const req = await fetch("http://localhost:5000/api/home", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        "x-access-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({
         name: tempName,
         status:"wat the fuck"
      })
      
    });
    console.log(tempName);
    const data = await req.json();
    console.log("data: "+data);
    if(data.status == "Ok"){
      setName(tempName);
      setTempName('');
      
    }else{
      alert("error: " + data.error);
    }
  }
 



  return (
    <div>
      <form onSubmit={updateName}>
        <input type="text" value={tempName} onChange={(e) =>{setTempName(e.target.value)}}/>
        <button type="submit">Submit</button>
      </form>
     <div> <h1>Name:{name || 'no name found'}</h1></div>
    </div>
  );
};
export default homePage;
