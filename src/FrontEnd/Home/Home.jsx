import { useState,useEffect,useHistory} from "react";
import jwt_decode from "jwt-decode";
import './HomeStyle.scss';
import TopBar from './topBar/topBar'
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from '@mui/icons-material/Home';
import PhotoIcon from '@mui/icons-material/Photo';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MessageIcon from "@mui/icons-material/Message";
import logo from "./pictures/logo.png";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const homePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  // For mobile 3 dots menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //end for mobile 3 dots menu
  return (
    <div className="homePage">
      {/* top bar */}
      <div className="topBarPage">
      <div id="topBar">
        <div id="topBarLeft">
        <div id="logo">
          <img src={logo} width="50px" height="50px"></img>
        </div>
        <div id="searchBar">
          <input
            type="search"
            id="query"
            name="q"
            placeholder="Search..."
            aria-label="Search through site content"
          />
          <button>
            <svg viewBox="0 0 1024 1024">
              <path
                className="path1"
                d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"
              ></path>
            </svg>
          </button>
        </div>
        </div>
        <div id="topBarMid">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label={<HomeIcon/>} {...a11yProps(0)} />
          <Tab label={<PhotoIcon/>}{...a11yProps(1)} />
        </Tabs>
      </Box>
      </div>
      <div id="topBarRight">
        <div id="profile">
          <img></img>
          <p>{name || 'no name found'}</p>
        </div>
        <div id="tools">
          <div id="moreTools">
          <div className="toolcase"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  ><MoreVertIcon/></div>
                   <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><AddCircleOutlineIcon /> Post </MenuItem>
        <MenuItem onClick={handleClose}><MessageIcon />  Messages </MenuItem>
        <MenuItem onClick={handleClose}><NotificationsActiveIcon /> Notifications </MenuItem>
        <MenuItem onClick={handleClose}><SettingsIcon/> Settings </MenuItem>
      </Menu>
      </div>
          <div className="toolcasePc" id="post">
            <AddCircleOutlineIcon />
          </div>
          <div className="toolcasePc" id="message">
            <MessageIcon />
          </div>
          <div className="toolcasePc" id="notifications">
            <NotificationsActiveIcon />
          </div>
          <div className="toolcasePc" id="settings">
            <SettingsIcon/>
          </div>
        </div>
      </div>
    
      </div>
      <div id="topBarMidForPhone">
        <Box id="topBoxMidForPhone" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label={<HomeIcon/>} {...a11yProps(0)} />
          <Tab label={<PhotoIcon/>}{...a11yProps(1)} />
        </Tabs>
      </Box>
      </div>
    </div>
      {/* end of top bar */}
      <Box sx={{ width: "100%" }}>
      
      <TabPanel value={value} index={0}>
       item one
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
       {/* tab links */}
        {/*end of tab content */}
    </div>
  );
};
export default homePage;
      {/* <form onSubmit={updateName}>
        <input type="text" value={tempName} onChange={(e) =>{setTempName(e.target.value)}}/>
        <button type="submit">Submit</button>
      </form>
     <div> <h1>Name:{name || 'no name found'}</h1></div> */}