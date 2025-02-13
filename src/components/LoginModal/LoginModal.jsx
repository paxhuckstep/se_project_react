import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";


function LoginModal({isOpen, onClose, handleLogIn, handleRegisterClick
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogIn({ email, password }, resetValues);
      };
   const handleEmailChange = (e) => {
        setEmail(e.target.value);
      }
      const handlePasswordChange = (e) => {
        setPassword(e.target.value)
      }
    const resetValues = () => {
        setEmail("");
        setPassword("");
    }

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWithForm
    title="Log In"
    buttonText="Log In"
    onClose={onClose}
    isOpen={isOpen}
    onSubmit={handleSubmit}
    isSwitchSeen={true}
    onSwitch={handleRegisterClick}
    switchText={"or Sign Up"}
  >
    <label htmlFor="email" className="modal__label">
      E-mail
      <input
        type="email"
        name="email"
        className="modal__input"
        id="login-email"
        placeholder="email"
        minLength="1"
        required
        onChange={handleEmailChange}
        value={email}
      />
    </label>
    <label htmlFor="password" className="modal__label">
        Password
      <input
        type="password"
        name="password"
        className="modal__input modal__input_last"
        id="password"
        placeholder="Password"
        minLength="2"
        required
        onChange={handlePasswordChange}
        value={password}
      />
    </label>
  </ModalWithForm>
  );
}

export default LoginModal;