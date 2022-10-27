import React from "react";
import { Link } from 'react-router-dom';
import './Logo.css';
import headerLogo from '../../images/logo.svg';

function Logo() {
    return (
        <Link to="/" className="logo" scr={headerLogo} style={{ backgroundImage: `url(${headerLogo})`}} alt="Логотип"></Link>
    )
}

export default Logo;