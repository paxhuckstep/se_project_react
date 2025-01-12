import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ card, isOpen, onClose, onSubmit }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__confirm-delete">
        <h2 className="modal__title modal__title_confirm-delete">
          Are you sure you want to delete this item?
          This action is
          irreversible.
        </h2>
        
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_form"
        />
        <form className="modal__form">
          
          <button onSubmit={onSubmit} type="submit" className="modal__confirmed">
        Yes, delete item
          </button>
          <button onClick={onClose} className="modal__cancel">Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
