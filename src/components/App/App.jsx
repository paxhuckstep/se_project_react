import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  editCurrentUser,
} from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getToken, removeToken, setToken } from "../../utils/token";
import * as auth from "../../utils/auth";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    _id: "",
  });

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleSignInClick = () => {
    setActiveModal("sign-in");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegistration = (
    { name, avatar, email, password, confirmPassword },
    resetValues
  ) => {
    if (password === confirmPassword) {
      auth
        .register(name, avatar, email, password)
        .then((res) => {
          setCurrentUser(res.name, res.avatar, res._id);
          resetValues();
        })
        .catch(console.error);
    }
  };

  const handleLogIn = ({ email, password }, resetValues) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);

          auth
            .getCurrentUser(data.token)
            .then(({ name, avatar, _id }) => {
              setCurrentUser(name, avatar, _id);
              resetValues();
              closeActiveModal();
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    removeToken();
    setIsLoggedIn(false);
    // navigate to home page??
  };

  const handleAddItemModalSubmit = (
    { name, imageUrl, weather },
    resetValues
  ) => {
    const token = getToken();
    addItem({ name, imageUrl, weather, token })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
        resetValues();
      })
      .catch(console.error);
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = getToken();

    editCurrentUser({ name, avatar }, token)
      .then((res) => {
        setCurrentUser(res); // does this work regardless?
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleConfirmDeleteModalClick = (card) => {
    const token = getToken();
    deleteItem(card._id, token)
      .then(() => {
        closeActiveModal();
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id != card._id;
          })
        );
      })
      .catch(console.error);
  };

  const handleCardLike = (card, isLiked) => {
    const { _id } = card;
    const token = getToken();
    !isLiked
      ? addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
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

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth
      .getCurrentUser(jwt)
      .then(({ name, avatar, _id }) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, avatar, _id });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleRegisterClick={handleRegisterClick}
              handleSignInClick={handleSignInClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
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
                    handleLogOut={handleLogOut}
                    handleEditProfileClick={handleEditProfileClick}
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
          <RegisterModal
            onClose={closeActiveModal}
            isOpen={activeModal === "register"}
            onRegisterSubmit={handleRegistration}
          />
          <LoginModal
            onClose={closeActiveModal}
            isOpen={activeModal === "sign-in"}
            handleLogIn={handleLogIn}
          />
          <EditProfileModal
            onClose={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            handleEditProfileSubmit={handleEditProfileSubmit}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
