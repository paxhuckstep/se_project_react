import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({isOpen, onClose
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!password === confirmPassword) {
      return ("things")
    }
    onRegisterSubmit({username, email, password}, resetValues);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }  



  if (!isOpen) {
    return null;
  }

  return (
    <ModalWithForm
    title="Register"
    buttonText="Register"
    onClose={onClose}
    isOpen={isOpen}
    onSubmit={handleSubmit}
  >
    <label htmlFor="username" className="modal__label">
      username
      <input
        type="text"
        name="username"
        className="modal__input"
        id="username"
        placeholder="username"
        minLength="1"
        maxLength="30"
        required
        onChange={handleUsernameChange}
        value={username}
      />
    </label>
    <label htmlFor="email" className="modal__label">
      E-mail
      <input
        type="text"
        name="email"
        className="modal__input"
        id="email"
        placeholder="e-mail"
        minLength="1"
        required
        onChange={handleEmailChange}
        value={email}
      />
    </label>
    <label htmlFor="password" className="modal__label">
        Password
      <input
        type="text"
        name="password"
        className="modal__input"
        id="password"
        placeholder="Password"
        minLength="2"
        required
        onChange={handlePasswordChange}
        value={password}
      />
    </label>
    <label htmlFor="confirmPassword" className="modal__label">
        Confirm Password
      <input
        type="text"
        name="confirmPassword"
        className="modal__input"
        id="confirm-password"
        placeholder="Confirm password"
        minLength="2"
        required
        onChange={handleConfirmPasswordChange}
        value={confirmPassword}
      />
    </label>
  </ModalWithForm>
  );
}

export default RegisterModal;