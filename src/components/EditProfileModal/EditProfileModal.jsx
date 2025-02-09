import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";


function LoginModal({isOpen, onClose, handleEditProfileSubmit
}) {
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditProfileSubmit({ username, avatar });
      };
   const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      }
      const handleAvatarChange = (e) => {
        setAvatar(e.target.value)
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
      New Username
      <input
        type="text"
        name="username"
        className="modal__input"
        id="new-username-input"
        placeholder="username"
        minLength="1"
        required
        onChange={handleUsernameChange}
        value={username}
      />
    </label>
    <label htmlFor="avatar" className="modal__label">
        New Avatar
      <input
        type="url"
        name="avatar"
        className="modal__input modal__input_last"
        id="new-avatar-input"
        placeholder="Avatar"
        minLength="2"
        required
        onChange={handleAvatarChange}
        value={avatar}
      />
    </label>
  </ModalWithForm>
  );
}

export default LoginModal;