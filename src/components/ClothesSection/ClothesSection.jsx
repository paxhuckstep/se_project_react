import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection ({ onCardClick }) {
    const clothingItems = defaultClothingItems;
    return (
<div className="clothes-section">
<div className="clothes-section__top">
    <p className=""> + Add New</p>
    <button></button>
</div>
<div className="">
<ul className="cardlothes-section__list">
          {clothingItems
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                />
              );
            })}
        </ul>
</div>
</div>
    )
}

export default ClothesSection;