import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";


function LoginModal({isOpen, onClose, handleLogin
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ email, password });
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
    title="Sign In"
    buttonText="Sign In"
    onClose={onClose}
    isOpen={isOpen}
    onSubmit={handleSubmit}
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
        type="text"
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