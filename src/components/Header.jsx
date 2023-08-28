import React from "react";
import logo from "../images/Logo.svg";

const Header = () => {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
        </header>
    );
};

export default Header;
