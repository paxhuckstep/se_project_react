import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CurrentTemperatureUnitContext  from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getToken, setToken} from "../../utils/token"

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
  const [currentUser, setCurrentUser] = useState({ username: "", email: "" });

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

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegistration = ({
    name,
    avatar,
    email,
    password,
    confirmPassword,
  }, resetValues ) => {
    if (password === confirmPassword) {
      auth
        .register(name, avatar, email, password)
        .then(() => {
          navigate("/login"); //wrong fix later
          resetValues();
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ email, password }) => {
    if(!email || !password) {
      return;
    }
    auth.authorize(email, password).then((data) => {
      if (data.jwt) { // so .jwt is coming from the useEfect down below ??
setToken(data.jwt);
setCurrentUser(data.user);
setIsLoggedIn(true);
//redirect maybe ?? I might be handling this already idk
      }
    }).catch(console.error);
  };


  const handleAddItemModalSubmit = (
    { name, imageUrl, weather },
    resetValues
  ) => {
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
        resetValues();
      })
      .catch(console.error);
  };

  const handleConfirmDeleteModalClick = (card) => {
    deleteItem(card._id)
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
  
    api //api.stuff isnt a thing yet
    .getUserInfo(jwt)
    .then(({ username, email }) => {
      setIsLoggedIn(true);
      setCurrentUser({ username, email });
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
        <RegisterModal
          onClose={closeActiveModal}
          isOpen={activeModal === "register"}
          onRegisterSubmit={handleRegistration}
        />
        <LoginModal
          onClose={closeActiveModal}
          isOpen={activeModal === "sign-in"}
          handleLogin={handleLogin}
        />
      </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
