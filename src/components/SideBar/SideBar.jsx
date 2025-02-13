import "./SideBar.css";
// import avatar from "../../assets/avatar.png";
import Avatar from "../Avatar/Avatar";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleLogOut, handleEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);
  const onLogOut = () => {
    handleLogOut();
  };
  const onEditProfileClick = () => {
    handleEditProfileClick();
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__avatar">
          <Avatar />
        </div>
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button onClick={onEditProfileClick} className="sidebar__button">
        Change Profile Data
      </button>
      <button onClick={onLogOut} className="sidebar__button">
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
