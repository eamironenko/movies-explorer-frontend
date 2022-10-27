import React from "react";
import './CloseButton.css'
import closeButton from '../../images/menu_closeButton.svg'

function MenuCloseButton() {
    return (
        <img className="closeButton" src={closeButton} alt="иконка закрытия"/>
    )
}

export default MenuCloseButton;
