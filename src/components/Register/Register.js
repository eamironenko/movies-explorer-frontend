import React from 'react';
import { Link } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import './Register.css';

import registerLogo from '../../images/login_logo.svg'

const Register = ({ onRegister, errorReg, message, setMessage, isLoading }) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isValid, isDirty },   
    } = useForm({mode:"onChange"});

    const onSubmit = (data) => {
      onRegister({
        name: data.name,
        email: data.email,
        password: data.password
      })
      console.log(data);
    }
    
    const clearErrorRegister = () => {
      setMessage('')
    }
    
    return (
      <section className="register">
        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
          <Link to='/'>
            <img className="register__logo" src={registerLogo} alt="Лого на странице регистрации" />
          </Link>
          <h2 className="register__title">Добро пожаловать!</h2>
          <label className="register__text" htmlFor='userName'>Имя</label>
          <input className="register__inputs"
            {...register("name", {
              required: "Имя должно быть заполнено",
              minLength: {
                value: 2,
                message: "Имя должно быть более 2 знаков" },
              maxLength: {
                value: 30,
                message: "Имя должно быть не более 30 знаков" },
              pattern: {
                value: /^[A-Za-zА-Яа-я ]+$/,
                message: "Имя введено некорректно"
              }
            })}
            type="text"
            disabled={isLoading}
            />
          {errors?.name && <span className={`${errors.name ? 'register__text register__text_error' : 'register__text_visible'}`}>{errors.name.message}</span>}
          <label className="register__text" htmlFor='userEmail'>E-mail</label>
          <input className="register__inputs register__inputs_email"
            {...register("email", {
              required: "Почта должна быть заполнена",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Почта введена некорректно",
              }
            })}
            type="email"
            disabled={isLoading}            
            />
          {errors?.email && <span className={`${errors.email ? 'register__text register__text_error' : 'register__text_visible'}`}>{errors.email.message}</span>}
          <label className="register__text" htmlFor='userPassword'>Пароль</label>
          <input className="register__inputs register__inputs_password"
            {...register("password", {
              required: "Пароль должен быть заполнен",
              minLength: {
                value: 2,
                message: "Пароль должн быть более 2 знаков" },
              maxLength: {
                value: 30,
                message: "Пароль должно быть не более 30 знаков" },
            })}
            type="password"
            disabled={isLoading}
            />
          {errors?.password && <span className="register__text register__text_error">{errors.password.message}</span>}
          <span className={`${errorReg ? 'register__text register__text_error' : 'register__text_visible'}`}>{errorReg}</span>
          <button 
             className={`${Object.keys(errors).length === 0 && isDirty &&  isValid ? 'register__submit-button' : 'register__submit-button register__submit-button_disabled'}`} 
             type="submit" 
             disabled={!isDirty || !isValid}>Зарегистрироваться
          </button>
          <p className="register__text register__text_result">Уже зарегистрированы?&nbsp;
            <Link to='/sign-in' className="register__text register__text_link" onClick={clearErrorRegister}>Войти</Link>
          </p>
        </form>
      </section>
    )
}

export default Register;