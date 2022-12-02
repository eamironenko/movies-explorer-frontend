import React, { useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Header from '../Header/Header';
import './Profile.css';
import {useCurrentUserContext} from "../../contexts/CurrentUserContext";
import {UPDATE_SUCCESS, UPDATE_UNSUCCESS } from '../../utils/errMessage';

function Profile({ state, isLoading, loggedIn, onUpdateUser, onSignOut, message, setMessage}) {

    const {user} = useCurrentUserContext();
    const currentUser = user
    
    const [isDisabled, setIsDisabled] = useState(true);
    const {
        register,
        handleSubmit,
        formState: {errors, isValid, isDirty},
        reset,       
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: currentUser.name,
            email: currentUser.email,
        }
    });

    useEffect(() => {
        reset(currentUser);
    }, [currentUser]);

    function onEdit() {
        setIsDisabled(false);
    }
    
    function onSubmit(data) {
        if ((currentUser.name !==  data.name  ) || ( currentUser.email !== data.email)) {
            onUpdateUser({name: data.name, email: data.email})
            setIsDisabled(true)
            setMessage(UPDATE_SUCCESS)
        } else {
            setMessage(UPDATE_UNSUCCESS);
        };
    }

    function handleSignOut() {
        onSignOut()
    }
    
    return (
        <div className="page">
            <Header loggedIn={loggedIn} />
            <main className='main'>
                <section className="profile">
                    <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
                        <div className="profile__content">
                            <label className="profile__text" htmlFor='userName'>Имя</label>
                            <input className="profile__inputs"
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
                                  placeholder='Имя'
                                  type="text"
                                  disabled={isDisabled || isLoading}
                                 />
                        </div>
                        {errors?.name && <span className='profile__text profile__text_error'>{errors.name.message}</span>}
                        <div className="profile__content">
                            <label className="profile__text" htmlFor='userEmail'>Email</label>
                            <input className="profile__inputs profile__inputs_email"
                                {...register("email", {
                                    required: "Почта должна быть заполнена",
                                    pattern: {
                                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                      message: "Почта введена некорректно",
                                    }
                                  })}
                                  placeholder="Email"
                                  type="email"
                                  disabled={isDisabled || isLoading}
                                />
                        </div>
                        {errors?.email && <span className='profile__text profile__text_error'>{errors.email.message}</span>}
                        <span className={`${isDisabled ? 'profile__text profile__text_error' : 'profile__text_visible'}`}>{message}</span>
                        <button className={`${isDisabled ? 'profile__submit-button' : 'profile__submit-button profile__submit-button_hidden'}`}
                            type="submit"
                            area-lebel="Редактировать профиль"
                            onClick={onEdit}>Редактировать
                        </button>
                        <button className={`${isDisabled ? 'profile__submit-button profile__submit-button_exit' : 'profile__submit-button_hidden'}`}
                            type="button"
                            area-lebel="Выйти из аккаунта"
                            onClick={handleSignOut}>Выйти из аккаунта
                        </button>
                        <button className={
                            `${isDisabled ? 'profile__submit-button_hidden' : isDirty ? 'profile__submit-button_save ' : 'profile__submit-button_save profile__submit-button_save_disable'}`}
                            type="submit"
                            disabled={!isDirty || !isValid}>Сохранить
                        </button>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default Profile;