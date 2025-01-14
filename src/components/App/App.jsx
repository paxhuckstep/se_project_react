import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import AddItemModal from "../AddItemModal/AddItemModal";
// import { defaultClothingItems } from "../../utils/constants";
import { deleteItem, getItems, addItem } from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [update, setUpdate] = useState(0);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const loadUpdate = () => {
    update === 0 ? setUpdate(1) : setUpdate(0); 
  }

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm-delete");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    //api stuff
    console.log(">>>", newId);
    addItem({ name, imageUrl, weather }).then(() => {
      setClothingItems((prevItems) => [
        { name, imageUrl, weather },
        ...prevItems,
      ]);
    });
    closeActiveModal();
 
  };

  const handleConfirmDeleteModalClick = (card) => {
    console.log(card._id);
    //api stuff
    deleteItem(card._id).then(closeActiveModal()).catch(console.error);
    loadUpdate();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    //api stuff, is working currently
    getItems().then((data) => {
      setClothingItems(data);
    });
  }, [update]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        ></AddItemModal>

        <ItemModal
          card={selectedCard}
          onClose={closeActiveModal}
          isOpen={activeModal === "preview"}
          onDeleteClick={handleDeleteClick}
        />
        <ConfirmDeleteModal
          card={selectedCard}
          onClose={closeActiveModal}
          isOpen={activeModal === "confirm-delete"}
          onConfirmClick={handleConfirmDeleteModalClick}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
