import "./HeaderProfile.css";
import "../Header/Header.css";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png";

function HeaderProfile({ isLoggedin, handleRegisterClick, handleSignInClick }) {
  if (isLoggedin) {
    return (
      <Link className="header__link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">Username</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </Link>
    );
  } else {
    return (
<div>
          <button onClick={handleRegisterClick} className="header-profile__button">Sign Up</button>
        <button onClick={handleSignInClick} className="header-profile__button header-profile__button_login">Log In</button>
        </div>
    );
  }
}
export default HeaderProfile;
