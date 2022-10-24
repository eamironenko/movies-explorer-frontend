import React from "react";
import './BurgerButton';
import burgerButton from '../../images/burger_button.svg';

function BurgerButton() {
    return (
        <img className="burger_button" src={burgerButton} alt="меню-бургер"/>
        
    )
}

export default BurgerButton;