import React from "react";
import { Link } from "react-dom";
import loginLogo from '../../images/login_logo.svg'
import './Login.css';

// import useForm from
// import validate from 

const Login = ({ onLogin, errorLogin, error }) => {
    //const { } = useForm();
    function login() { }

    return (
    <section className="login">
        <form className="login__form">
                <img className="login__logo" src={loginLogo}/>
                <h2 className="login__title">Рады видеть!</h2>
                <label className="login__text">E-mail</label>
                <input className="login__inputs login__inputs_email"/>
                <span className="login__text login__text_error login__text_visible">Что-то пошло не так ...</span>
                <label className="login__text">Пароль</label>
                <input className="login__inputs login__inputs_password"/>
                <span className="login__text login__text_error login__text_visible">Что-то пошло не так ...</span>
                <button className="login__submit-button">Войти</button>
                <p className="login__text login__text_result">Eще не зарегистрированы?
                   <Link className="login__text login__text_link">Регистрация</Link>
                </p>
        </form>
    </section>
    );
}

export default Login;