import "../HomeStyle.scss";
import TabPanel from "./tabView";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MessageIcon from "@mui/icons-material/Message";
import logo from "../pictures/logo.png";
function TopBar() {
  return (
    <div className="topBarPage">
      <div id="topBar">
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

        <div id="profile">
          <img></img>
          <p>Name</p>
        </div>
        <div id="tools">
          <div className="toolcase" id="post">
            <AddCircleOutlineIcon />
          </div>
          <div className="toolcase" id="message">
            <MessageIcon />
          </div>
          <div className="toolcase" id="notifications">
            <NotificationsActiveIcon />
          </div>
        </div>
      </div>
      
    </div>
  );
}
export default TopBar;