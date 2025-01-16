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
  const [formReset, setFormReset] = useState(0);

  const sendFormReset = () => {
    formReset === 0 ? setFormReset(1) : setFormReset(0);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    // console.log(card);
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

  // useEffect(() => {
  //   if (!activeModal) return; // stop the effect not to add the listener if there is no active modal
  //   // shouldn't this^ be "if (activeModal === "") return;" how does !activeModal work?

  //   const handleEscClose = (e) => {
  //     // define the function inside useEffect not to lose the reference on rerendering
  //     if (e.key === "Escape") {
  //       closeActiveModal();
  //     }
  //   };

  //   document.addEventListener("keydown", handleEscClose);

  //   return () => {
  //     // don't forget to add a clean up function for removing the listener

  //     //wouldn't this go inside of handleEscClose? Like it removes the listener once the Modal is closed???
  //     document.removeEventListener("keydown", handleEscClose);
  //   };
  // }, [activeModal]); // watch activeModal here

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        console.log(newItem);
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
        sendFormReset();
      })
      .catch(console.error);
  };

  const handleConfirmDeleteModalClick = (card) => {
    deleteItem(card._id)
      .then(() => {
        closeActiveModal();
        setClothingItems(
          clothingItems.filter((item) => {
            // console.log(item._id, card._id, item._id != card._id);
            return item._id != card._id;
          })
        );
      })
      .catch(console.error);
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
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

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
          formReset={formReset}
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
