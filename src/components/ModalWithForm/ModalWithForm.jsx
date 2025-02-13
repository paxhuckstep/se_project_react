import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isSwitchSeen,
  onSwitch,
  switchText,
}) {
  const switchButtonClassName = `modal__switch ${
    isSwitchSeen ? "" : "modal__switch_hidden"
  }`;

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
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          <button
            type="button"
            onClick={onSwitch}
            className={switchButtonClassName}
          >
            {switchText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
