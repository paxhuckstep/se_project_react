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
      <div className="header__user-container">
        <button onClick={handleSignInClick} className="headerprofile__button-login">Login</button>
        <button onClick={handleRegisterClick} className="headerprofile__button-register">Register</button>
      </div>
    );
  }
}
export default HeaderProfile;
