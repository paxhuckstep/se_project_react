import "./LoginModal.css";
import "../ModalWithForm/ModalWithForm.css"
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";


function LoginModal({isOpen, onClose, onSignInSubmit
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignInSubmit({ username, password }, resetValues);
      };
   const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      }
      const handlePasswordChange = (e) => {
        setPassword(e.target.value)
      }
    const resetValues = () => {
        setUsername("");
        setPassword("");
    }

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWithForm
    title="Sign In"
    buttonText="Sign In"
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
  </ModalWithForm>
  );
}

export default LoginModal;