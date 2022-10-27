import React from 'react';
import Header from '../Header/Header';
import './Profile.css';
import useForm from '../../utils/useForm';
import validate from '../../utils/validation'

const name = "Виталий";
const email = "pochta@yandex.ru";

function Profile({ loggedIn }) {
    const {
        values,
        handleChange,
        errors,
        isValid,
        handleSubmit
    } = useForm(editProfile, validate, "ep");

    const [isDisabled, setIsDisabled] = React.useState(true);

    function handleEdit() {
        setIsDisabled(false);
    }

    function editProfile() {
        console.log('No errors, submit callback called')
    }

    return (
        <div className="page">
            <Header loggedIn={loggedIn} />
            <main className='main'>
                <section className="profile">
                    <form className="profile__form" onSubmit={handleSubmit}>
                        <h3 className="profile__title">{`Привет, ${name}!`}</h3>
                        <div className="profile__content">
                            <label className="profile__text" htmlFor='userName'>Имя</label>
                            <input className="profile__inputs"
                                id="userName"
                                name="name"
                                type="text"
                                placeholder='Имя'
                                autoComplete='off'
                                value={values.name || ''}
                                onChange={handleChange}
                                disabled={isDisabled}
                                required />
                        </div>
                        <span className={`${errors.name ? 'profile__text profile__text_error' : 'profile__text_visible'}`}>{errors.name}</span>
                        <div className="profile__content">
                            <label className="profile__text" htmlFor='userEmail'>Email</label>
                            <input className="profile__inputs profile__inputs_email"
                                id="userEmail"
                                name="email"
                                type="email"
                                placeholder='Email'
                                autoComplete='off'
                                value={values.email || ''}
                                onChange={handleChange}
                                disabled={isDisabled}
                                required />
                        </div>
                        <span className={`${errors.name ? 'profile__text profile__text_error' : 'profile__text_visible'}`}>{errors.name}</span>
                        <button className={`${isDisabled ? 'profile__submit-button' : 'profile__submit-button_hidden'}`} type="button" area-lebel="Редактировать профиль" onClick={handleEdit}>Редактировать</button>
                        <button className={`${isDisabled ? 'profile__submit-button profile__submit-button_exit' : 'profile__submit-button_hidden'}`} type="button" area-lebel="Выйти из аккаунта">Выйти из аккаунта</button>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default Profile;