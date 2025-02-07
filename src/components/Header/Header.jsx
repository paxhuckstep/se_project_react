import "./Header.css";
import logo from "../../assets/logo.png";
// import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import HeaderProfile from "../HeaderProfile/HeaderProfile"

function Header({ handleAddClick, weatherData, isLoggedIn, handleRegisterClick, handleSignInClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="logo" src={logo} />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>
  <HeaderProfile isLoggedin={isLoggedIn} handleRegisterClick={handleRegisterClick} handleSignInClick={handleSignInClick} />
    </header>
  );
}

export default Header;
