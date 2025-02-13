import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({ onCardClick, clothingItems, handleAddClick, handleCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__top">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__button" onClick={handleAddClick}>
          {" "}
          + Add New
        </button>
      </div>
      <div className="">
        <ul className="clothes-section__list">
          {clothingItems.map((item) => {
            if (item.owner === currentUser._id)
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                  handleCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
