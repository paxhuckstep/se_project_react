import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick, clothingItems, handleAddClick, handleLogOut, handleEditProfileClick, handleCardLike, isLoggedIn }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleLogOut={handleLogOut} handleEditProfileClick={handleEditProfileClick} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
