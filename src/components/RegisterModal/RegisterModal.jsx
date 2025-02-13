import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({ isOpen, onClose, onRegisterSubmit, handleSignInClick }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetValues = () => {
    setName("");
    setEmail("");
    setAvatar("");
    setPassword("");
    setConfirmPassword("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit(
      { name, avatar, email, password, confirmPassword },
      resetValues
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSwitchSeen={true}
      onSwitch={handleSignInClick}
      switchText={"or Log In"}
    >
      <label htmlFor="name" className="modal__label">
        name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="name"
          minLength="1"
          maxLength="30"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        avatar
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="avatar url"
          minLength="1"
          required
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>

      <label htmlFor="email" className="modal__label">
        E-mail
        <input
          type="email"
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
          type="password"
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
          type="password"
          name="confirmPassword"
          className="modal__input modal__input_last"
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
