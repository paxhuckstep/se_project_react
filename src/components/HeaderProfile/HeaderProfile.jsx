import "./HeaderProfile.css";
import "../Header/Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function HeaderProfile({ isLoggedin, handleRegisterClick, handleSignInClick }) {
  const currentUser = useContext(CurrentUserContext);
  const firstLetter = currentUser.name.charAt(0).toUpperCase();

  const hideImage = () => {
    const avatarImage = document.querySelector("#avatar-image");
    const avatarAlt = document.querySelector("#avatar-alt");
    avatarImage.classList.add("header__avatar_hidden");
    avatarAlt.classList.add("header__alt_visible");
  }

  if (isLoggedin) {
    return (
      <Link className="header__link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">{currentUser.name}</p>
          <img
          id="avatar-image"
            src={currentUser.avatar}
            onError={hideImage}
            className="header__avatar"
          />
          <div id="avatar-alt" className="header__alt"><div className="header__alt-text">{firstLetter}</div></div>
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
          className="header-profile__button header-profile__button_login"
        >
          Log In
        </button>
      </div>
    );
  }
}
export default HeaderProfile;
