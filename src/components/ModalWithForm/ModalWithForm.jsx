import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, isOpen, onClose, onSubmit }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_form"
        />
        <form className="modal__form">
          {children}
          <button onSubmit={onSubmit} type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
