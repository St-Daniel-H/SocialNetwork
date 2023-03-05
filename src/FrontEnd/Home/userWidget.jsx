import image from "../login/picture.jpg";
import "./userWidget.scss";
function UserWidget() {
  return (
    <div id="userWidget">
      <div id="userInfo">
        <img id="userWidgetImage" width="80" height="80" src={image}></img>
        <div id="userNameAndBio">
          <h4>Name</h4>
          <p>Bio</p>
        </div>
      </div>
    </div>
  );
}
export default UserWidget;
