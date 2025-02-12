import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.includes(currentUser._id);

  const itemLikeButtonClassName = !isLiked ? "card__like-button-inactive" : "card__like-button-active" ;

  const handleCardClick = () => {
    onCardClick(item);

  };

  const onCardLike =() => {
    handleCardLike(item, isLiked);
    console.log("isLiked =", isLiked);
  }

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <button onClick={onCardLike} className={itemLikeButtonClassName}></button>
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
