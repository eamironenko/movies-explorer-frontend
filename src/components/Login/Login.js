import React from "react";
import { Link } from "react-router-dom";
import { useForm} from 'react-hook-form';
import loginLogo from '../../images/login_logo.svg'
import './Login.css';

const Login = ({ onLogin, errorMessage, setErrorMessage, isLoading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        onLogin({
            email: data.email,
            password: data.password
        })
        console.log(data);
    }

    const clearErrorRegister = () => {
        setErrorMessage('')
      }
   
    return (
        <section className="login">
            <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                <img className="login__logo" src={loginLogo} alt="Лого на странице регистрации" />
                <h2 className="login__title">Рады видеть!</h2>
                <label className="login__text" htmlFor="userEmail">E-mail</label>
                <input className="login__inputs login__inputs_email"
                    id="userEmail"
                    name="email"
                    type="email"
                    {...register("email", {
                        required: "Почта должна быть заполнена",
                        pattern: {
                          value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                          message: "Почта введена некорректно",
                        }
                      })}
                      disabled={isLoading}
                    />
                {errors?.email && <span className="login__text login__text_error">{errors.email.message}</span>}
                <label className="login__text" htmlFor="userPassword">Пароль</label>
                <input className="login__inputs login__inputs_password"
                    id="userPassword"
                    name="password"
                    type="password"
                    {...register("password", {
                        required: "Пароль должен быть заполнен",
                        minLength: {
                          value: 2,
                          message: "Пароль должн быть более 2 знаков" },
                        maxLength: {
                          value: 30,
                          message: "Пароль должно быть не более 30 знаков" },
                      })}
                      disabled={isLoading}
                      />
                {errors?.password && <span className="login__text login__text_error">{errors.email.message}</span>}
                <span className={`${errorMessage ? 'login__text login__text_error' : 'login__text_visible'}`}>{errorMessage}</span>
                <button className={`${Object.keys(errors).length === 0 ? 'login__submit-button' : 'login__submit-button login__submit-button_disabled'}`} 
                  type="submit" 
                  disabled={!isDirty || !isValid}>Войти
                </button>
                <p className="login__text login__text_result">Eще не зарегистрированы?&nbsp;
                    <Link to='/sign-up' className="login__text login__text_link" onClick={{clearErrorRegister}}>Регистрация</Link>
                </p>
            </form>
        </section>
    );
}

export default Login;