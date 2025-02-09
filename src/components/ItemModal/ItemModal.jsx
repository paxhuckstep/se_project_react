import "./ItemModal.css";

function ItemModal({ onClose, card, isOpen, onDeleteClick }) {
  if (!isOpen) {
    return null;
  }


//   // Checking if the current user is the owner of the current clothing item
// const isOwn = selectedCard.owner === currentUser._id;

// // Creating a variable which you'll then set in `className` for the delete button
// const itemDeleteButtonClassName = (
//   `modal__delete-button ${isOwn ? '' : 'modal__delete-button_hidden'}`
// );

//what is this and how does it work? ^^^

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
            <button className="modal__delete-button" onClick={onDeleteClick}>
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
