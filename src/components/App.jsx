import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupImage from "./PopupImage";
import myApi from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import { CardContext } from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Logo from '../images/Logo.svg';
import PageOverlay from "./PageOverlay";
import DeleteCardPopup from "./DeleteCardPopup";
import { AppContext } from "../contexts/AppContext";
import ProtectedRoute from "./ProtectedRoute";
import Register from './Register';
import Login from './Login';
import { Routes, Route, useNavigate } from "react-router-dom";
import myAuthApi from "../utils/AuthApi";
import InfoTooltip from "./InfoTooltip";





function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [cardData, setCardData] = useState({})
  const [isPageOverlayLoading, setIsPageOverlayLoading] = useState(true);
  const [isCardDeleteLoading, setIsCardDeleteLoading] = useState(true);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = useState(true);
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(true);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);


  const navigate = useNavigate();


  function escBtnHandle(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    myApi.changeLikeCardStatus(card, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleCardDelete(card) {
    setIsCardDeleteLoading(false)
    myApi.deleteCard(card).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setTimeout(() => {
        setIsCardDeleteLoading(true)
      }, 500);
    })

  }


  function handleUpdateUser({ name, about }) {
    setIsEditProfileLoading(false)
    myApi.patchUserInfo({ name, about }).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setTimeout(() => {
        setIsEditProfileLoading(true)
      }, 500);
    })
  }

  function handleUpdateAvatar({ avatar }) {
    setIsEditAvatarLoading(false)
    myApi.patchUserAvatar({ avatar }).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setTimeout(() => {
        setIsEditAvatarLoading(true)
      }, 500);
    })
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsAddPlaceLoading(false)
    myApi.postNewCard({ name, link }).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setTimeout(() => {
        setIsAddPlaceLoading(true)
      }, 500);
    })
  }

  const handleTrashBtnClick = (card) => {
    setCardData(card);
    setIsDeleteCardPopupOpen(true)
    window.addEventListener('keydown', escBtnHandle)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
    window.addEventListener('keydown', escBtnHandle)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
    window.addEventListener('keydown', escBtnHandle)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
    window.addEventListener('keydown', escBtnHandle)
  };

  const handleCardClick = (card) => {
    setCardData(card);
    setSelectedCard(true);
    window.addEventListener('keydown', escBtnHandle)
  }

  const closeAllPopups = () => {
    setIsDeleteCardPopupOpen(false)
    setSelectedCard(false);
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltipOpen(false)
    window.removeEventListener('keydown', escBtnHandle);
  }

  const onSignUp = (data) => {
    myAuthApi.signUp(data).then((res) => {
      console.log(res)
      setIsRegister(true)
      setIsInfoTooltipOpen(true)
      navigate('/sign-in', { replace: true })
    }).catch(() => {
      setIsRegister(false)
      setIsInfoTooltipOpen(true)
    })
  }

  const onSignIn = (data) => {
    myAuthApi.signIn(data).then((res) => {
      localStorage.setItem('jwt', res.token)
      localStorage.setItem('userName', data.email);
      setIsAuth(true)
      setUserEmail(data.email)
      navigate('/mesto-react', { replace: true })
    }).catch(() => {
      setIsAuth(false)
      setIsRegister(false)
      setIsInfoTooltipOpen(true)
    })
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('userName')
    setIsAuth(false)
    setUserEmail('')
    navigate('/mesto-react', { replace: true })
  }

  const handleTokenCheck = (jwt) => {
    myAuthApi.checkToken(jwt).then((res) => {
      if (res) {
        setIsAuth(true);
        navigate('/mesto-react', { replace: true });
      }
    })
  }

  const handleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen)
  }



  useEffect(() => {
    myApi.getUserInfo().then(user => {
      setCurrentUser(user)
    }).catch((err) => {
      console.error(err);
    });
    myApi.getInitialCards().then(cards => {
      setCards(cards)
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setTimeout(() => {
        setIsPageOverlayLoading(false)
      }, 1000);
    });
  }, [])



  useEffect(() => {
    const currentEmail = localStorage.getItem('userName');
    currentEmail ? setUserEmail(currentEmail) : setUserEmail('')
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      handleTokenCheck(jwt);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <CardContext.Provider value={cardData} >
          <AppContext.Provider value={isAuth}>

            <div>
              {/* <PageOverlay isLoading={isPageOverlayLoading} Logo={Logo} /> */}
              <Header handleBurgerMenu={handleBurgerMenu} isMenuOpen={isBurgerMenuOpen} userEmail={userEmail} logout={logout} isAuth={isAuth} />
              <Routes>
                <Route path="/mesto-react" element={
                  <ProtectedRoute element={Main} handleTrashBtnClick={handleTrashBtnClick} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} loggedIn={isAuth}
                  />
                } />
                <Route path="/sign-in" element={<Login submitHandler={onSignIn} />} />
                <Route path="/sign-up" element={<Register submitHandler={onSignUp} />} />
              </Routes>

              <Footer />
              <InfoTooltip isRegister={isRegister} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
              <EditProfilePopup isLoading={isEditProfileLoading} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} formName={'edit'} title={'Редактировать профиль'} buttonText={'Сохранить'}>
              </EditProfilePopup>
              <AddPlacePopup isLoading={isAddPlaceLoading} submitHandler={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name={'add'} title={'Новое место'} buttonText={'Создать'} >
              </AddPlacePopup>
              <DeleteCardPopup isLoading={isCardDeleteLoading} onSubmit={handleCardDelete} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} name={'delete'} title={'Вы уверены?'} buttonText={'Да'} />
              <EditAvatarPopup isLoading={isEditAvatarLoading} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name={'avatar'} title={'Обновить аватар'} buttonText={'Сохранить'} >
              </EditAvatarPopup>

              <PopupImage card={selectedCard} onClose={closeAllPopups} />
            </div>
          </AppContext.Provider>
        </CardContext.Provider>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
