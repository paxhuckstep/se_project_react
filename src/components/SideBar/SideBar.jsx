import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar({ handleLogOut, handleEditProfileClick }) {
  const onLogOut = () => {
    handleLogOut();
  }
  const onEditProfileClick = () => {
    handleEditProfileClick();
  }

  return (
    <div className="sidebar">
    <div className="sidebar__top">
      <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
    <button onClick={onEditProfileClick} className="sidebar__button">Change Profile Data</button>
    <button onClick={onLogOut} className="sidebar__button">Log Out</button>
    </div>
  );
}

export default SideBar;
