import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection () {
    const clothingItems = defaultClothingItems;
    return (
<div className="clothes-section">
<div className="clothes-section__top">
    <p className=""> + Add New</p>
    <button></button>
</div>
<div className="">
<ul className="cards__list">
          {clothingItems
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                //   onCardClick={handleCardClick} ----- pass in later
                />
              );
            })}
        </ul>
</div>
</div>
    )
}

export default ClothesSection;