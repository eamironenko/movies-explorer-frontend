import './SearchForm.css';
import logoFind from '../../images/find_logo.svg';
import line from '../../images/input__strokeLine.svg'
import React from 'react';
function SearchForm() {
    const [searchText, setSearchText] = React.useState('');
    const [searchError, setSearchError] = React.useState('');

    function handleSubmitFind(e) {
        e.preventDefault();
        if (searchText.length === 0) {
            setSearchError(true);
        } else {
            setSearchError(false);
        }
    }

    return (
        <div class="searchForm">
            <form class="searchForm__container">
                <div class="searchForm__film-container">
                    <input class="searchForm__input" name="foundFilm" type="text" placeholder="Фильм" required />
                    <span class="searchForm__error searchForm__error_visible">Нужно ввести ключевое слово</span>
                    <button class="searchForm__button" type="submit">
                        <img class="searchForm__logo" alt="Логотип поиска" src={logoFind}/>
                    </button>
                </div>
                <img class="searchForm__line" alt="Декоративный элемент" src={line} />
                <div class="searchForm__checkbox-container">
                    <input class="searchForm__checkbox" type="checkbox" />
                    <p class="searchForm_checkbox-text">Короткометнажки</p>
                </div>
            </form>
        </div>
    )
}
