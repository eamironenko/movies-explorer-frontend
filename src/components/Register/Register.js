import React from 'react';
import './Register.css';
import useForm from '../../utils/useForm';
import validate from '../../utils/validation';
import { Link } from 'react-router-dom';

import registerLogo from '../../images/login_logo.svg'

const Register = ({ onRegister}) => {
    const {
      values,
      handleChange,
      errors,
      isValid,
      handleSubmit
    } = useForm(register, validate, "rg");

    function register() {
      console.log('No errors, submit callback called!')
    }
    
    return (
      <section className="register">
        <form className="register__form" onSubmit={handleSubmit}>
          <img className="register__logo" src={registerLogo} alt="Лого на странице регистрации"/>
          <h2 className="register__title">Добро пожаловать!</h2>
          <label className="register__text" htmlFor='userName'>Имя</label>
          <input className="register__inputs"
            id="userName"
            name="name"
            type="text"
            autoComplete='off'
            value={values.name || ''}
            onChange={handleChange}
            required />
          <span className={`${errors.name ? 'register__text register__text_error' : 'register__text_visible'}`}>Что-то пошло не так...</span>
          <label className="register__text" htmlFor='userEmail'>E-mail</label>
          <input className="register__inputs register__inputs_email"
            id="userEmail"
            name="email"
            type="email"
            autoComplete='off'
            value={values.email || ''}
            onChange={handleChange}
            required />
          <span className={`${errors.email ? 'register__text register__text_error' : 'register__text_visible'}`}>Что-то пошло не так...</span>
          <label className="register__text" htmlFor='userPassword'>Пароль</label>
          <input className="register__inputs register__inputs_password"
            id="userPassword"
            name="password"
            type="password"
            autoComplete='off'
            value={values.password || ''}
            onChange={handleChange}
            required />
            <span className={`${errors.password ? 'register__text register__text_error' : 'register__text_visible'}`}>Что-то пошло не так...</span>
          <span className="register__text register__text_error register__text_visible">Что-то пошло не так ...</span>
          <button className={`${isValid ? 'register__submit-button' : 'register__submit-button '}`} type="submit" disabled={!isValid}>Зарегистрироваться</button>
          <p className="register__text register__text_result">Уже зарегистрированы?&nbsp;
            <Link to='/sign-in' className="register__text register__text_link">Войти</Link>
          </p>
        </form>
      </section>
    )
}

export default Register;