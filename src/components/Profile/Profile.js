import React, { useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import './Profile.css';

function Profile({ state, loggedIn, onUpdateUser, onSignOut, errorMessage, setErrorMessage, isLoading }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const {
        register,
        handleSubmit,
        formState: {errors, isDirty, isValid},
        reset,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: currentUser.name,
            email: currentUser.email,
        }
    });

    useEffect(() => {
        reset(currentUser)
    }, [currentUser])

    function handleEdit() {
        setIsDisabled(false);
    }

    const onSubmit = (data) => {
        if ((data.name !== currentUser.name) || (data.email !== currentUser.email)) {
            onUpdateUser({name: data.name, email: data.email})
            setErrorMessage('Данные успешно сохранены')
            setIsDisabled(true)
        } else {
            setErrorMessage("Данные не изменены.")
        }
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
                        <h3 className="profile__title">{`Привет, ${currentUser.name}!`}</h3>
                        <div className="profile__content">
                            <label className="profile__text" htmlFor='userName'>Имя</label>
                            <input className="profile__inputs"
                                id="userName"
                                name="name"
                                type="text"
                                placeholder='Имя'
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
                                  disabled={isDisabled ||isLoading}
                                 />
                        </div>
                        {errors?.name && <span className='profile__text profile__text_error'>{errors.name.message}</span>}
                        <div className="profile__content">
                            <label className="profile__text" htmlFor='userEmail'>Email</label>
                            <input className="profile__inputs profile__inputs_email"
                                id="userEmail"
                                name="email"
                                type="email"
                                placeholder='Email'
                                {...register("email", {
                                    required: "Почта должна быть заполнена",
                                    pattern: {
                                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                      message: "Почта введена некорректно",
                                    }
                                  })}
                                  disabled={isDisabled ||isLoading}
                                />
                        </div>
                        {errors?.email && <span className='profile__text profile__text_error'>{errors.email.message}</span>}
                        <button className={`${isDisabled ? 'profile__submit-button' : 'profile__submit-button_hidden'}`}
                            type="button"
                            area-lebel="Редактировать профиль"
                            onClick={handleEdit}>Редактировать
                        </button>
                        <button className={`${isDisabled ? 'profile__submit-button profile__submit-button_exit' : 'profile__submit-button_hidden'}`}
                            type="button"
                            area-lebel="Выйти из аккаунта"
                            onClick={handleSignOut}>Выйти из аккаунта
                        </button>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default Profile;