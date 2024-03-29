import React from "react";
import { Link } from "react-router-dom";

import './Login.css';
import useForm from '../../utils/useForm';
import validate from '../../utils/validation';
import loginLogo from '../../images/login_logo.svg'

const Login = ({ onLogin, errorLogin, error }) => {
    const {
        values,
        handleChange,
        errors,
        isValid,
        handleSubmit
    } = useForm(login, validate, "lg");
    function login() {
        console.log('No errors, submit callback called!');
    }

    return (
        <section className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <img className="login__logo" src={loginLogo} alt="Лого на странице регистрации" />
                <h2 className="login__title">Рады видеть!</h2>
                <label className="login__text" htmlFor="userEmail">E-mail</label>
                <input className="login__inputs login__inputs_email"
                    id="userEmail"
                    name="email"
                    type="email"
                    autoComplete="off"
                    value={values.email || ''}
                    onChange={handleChange}
                    required />
                <span className={`${errors.email ? 'login__text login__text_error' : 'login__text_visible'}`}>Что-то пошло не так...</span>
                <label className="login__text" htmlFor="userPassword">Пароль</label>
                <input className="login__inputs login__inputs_password"
                    id="userPassword"
                    name="password"
                    type="password"
                    autoComplete="off"
                    value={values.password || ''}
                    onChange={handleChange}
                    required />
                <span className={`${errors.password ? 'login__text login__text_error' : 'login__text_visible'}`}>Что-то пошло не так...</span>
                <button className={`${isValid ? 'login__submit-button' : 'login__submit-button login__submit-button_disabled'}`} type="submit" disabled={!isValid}>Войти</button>
                <p className="login__text login__text_result">Eще не зарегистрированы?&nbsp;
                    <Link to='/sign-up' className="login__text login__text_link">Регистрация</Link>
                </p>
            </form>
        </section>
    );
}

export default Login;