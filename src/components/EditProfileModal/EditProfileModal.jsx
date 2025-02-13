import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, handleEditProfileSubmit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfileSubmit({ name, avatar });
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSwitchSeen={false}
      onSwitch={null}
      switchText={""}
    >
      <label htmlFor="name" className="modal__label">
        Name *
        <input
          type="text"
          name="name"
          className="modal__input"
          id="new-name-input"
          placeholder={currentUser.name}
          minLength="1"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar *
        <input
          type="url"
          name="avatar"
          className="modal__input modal__input_last"
          id="new-avatar-input"
          placeholder={currentUser.avatar}
          minLength="2"
          required
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
