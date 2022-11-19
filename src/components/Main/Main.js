import React from "react";
import Header from "../Header/Header";
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import './Main.css';
//import {useCurrentUserContext} from "../../contexts/CurrentUserContext";

function Main() {
    //const {user} = useCurrentUserContext();
    
    return (
        <div className="page">

            <Header loggedIn={false}/>
            <main className="main">
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
            </main>s
            <Footer/>
        </div>
    )
};
export default Main;