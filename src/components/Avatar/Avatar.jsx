import "./Avatar.css";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Avatar() {
  const [imageBroken, setImageBroken] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const firstLetter = currentUser.name.charAt(0).toUpperCase();

  return (
    <div className="avatar">
      {currentUser.avatar && !imageBroken ? (
        <img
          id="avatar-image"
          src={currentUser.avatar}
          onError={() => setImageBroken(true)}
          className="avatar__image"
        />
      ) : (
        <div className="avatar__alt-text">{firstLetter}</div>
      )}
    </div>
  );
}

export default Avatar;
