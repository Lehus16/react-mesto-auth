import React, { useState } from "react";
import logo from "../images/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import burger from "../images/Burger.svg";
import close from "../images/CloseIcon.svg";

const Header = ({ logout, userEmail, isAuth }) => {

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const location = useLocation();

  const handleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen)
  }

  return (
    <>
      <div className={isBurgerMenuOpen ? 'header__burger-container' : 'header__burger-container header__burger-container_closed'}>
        {userEmail && <p className="header__email">{userEmail}</p>}
        {isAuth ? <Link to={"/sign-in"} className={'header__login header__login_logged'} onClick={logout}>Выйти</Link> :
          location.pathname === '/sign-up' ?
            <Link to={"/sign-in"} className={'header__login'}>Войти</Link> :
            <Link to={"/sign-up"} className={'header__login'}>Регистрация</Link>}

      </div>
      <header className="header">

        <Link to={'/mesto-react'}><img className="header__logo" src={logo} alt="логотип" /></Link>
        <div className="header__container">{userEmail && <p className="header__email">{userEmail}</p>}
          {isAuth ? <Link to={"/sign-in"} className={'header__login header__login_logged'} onClick={logout}>Выйти</Link> :
            location.pathname === '/sign-up' ?
              <Link to={"/sign-in"} className={'header__login'}>Войти</Link> :
              <Link to={"/sign-up"} className={'header__login'}>Регистрация</Link>}
        </div>
        <button onClick={handleBurgerMenu} className="header__burger-button"><img className="header__burger-image" src={isBurgerMenuOpen ? close : burger} alt="" /></button>
      </header>
    </>
  );
};

export default Header;
