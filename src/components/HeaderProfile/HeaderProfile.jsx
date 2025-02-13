import "./HeaderProfile.css";
import "../Header/Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Avatar from "../Avatar/Avatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function HeaderProfile({ isLoggedin, handleRegisterClick, handleSignInClick }) {
  const currentUser = useContext(CurrentUserContext);

  if (isLoggedin) {
    return (
      <Link className="header__link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">{currentUser.name}</p>
          <div className="header__avatar">
            {" "}
            <Avatar />
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <div>
        <button
          onClick={handleRegisterClick}
          className="header-profile__button"
        >
          Sign Up
        </button>
        <button
          onClick={handleSignInClick}
          className="header-profile__button"
        >
          Log In
        </button>
      </div>
    );
  }
}
export default HeaderProfile;
