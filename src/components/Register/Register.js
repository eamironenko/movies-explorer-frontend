import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import registerLogo from '../../images/login_logo.svg'
// import useForm from ;
// import validate from ;

const Register = ({ onRegister}) => {
    //const {} = useForm();
    function register() {}
    
    return (
        <section className="register">
        <form className="register__form">
          <img className="register__logo" src={registerLogo}/>
          <h2 className="register__title">Добро пожаловать!</h2>
          <label className="register__text">Имя</label>
          <input className="register__inputs"/>
          <span className="register__text register__text_error register__text_visible">Что-то пошло не так ...</span>
          <label className="register__text">E-mail</label>
          <input className="register__inputs register__inputs_email"/>
          <span className="register__text register__text_error register__text_visible">Что-то пошло не так ...</span>
          <label className="register__text">Пароль</label>
          <input className="register__inputs register__inputs_password"/>
          <span className="register__text register__text_error register__text_visible">Что-то пошло не так ...</span>
          <button className="register__submit-button">Зарегистрироваться</button>
          <p className="register__text register__text_result">Уже зарегистрированы?
                 <Link className="register__text register__text_link">Войти</Link>
          </p>
        </form>
      </section>
    )
}

export default Register;