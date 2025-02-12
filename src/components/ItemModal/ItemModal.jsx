import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ onClose, card, isOpen, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_image"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-top">
            {" "}
            <h2 className="modal__caption">{card.name}</h2>
            <button
              className={itemDeleteButtonClassName}
              onClick={onDeleteClick}
            >
              Delete Item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
