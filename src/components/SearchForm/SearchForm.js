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
        <div className="searchForm">
            <form className="searchForm__container">
                <div className="searchForm__film-container">
                    <input className="searchForm__input" name="foundFilm" type="text" placeholder="Фильм" required />
                    <span className="searchForm__error searchForm__error_visible">Нужно ввести ключевое слово</span>
                    <button className="searchForm__button" type="submit">
                        <img className="searchForm__logo" alt="Логотип поиска" src={logoFind}/>
                    </button>
                </div>
                <img className="searchForm__line" alt="Декоративный элемент" src={line} />
                <div className="searchForm__checkbox-container">
                    <input className="searchForm__checkbox" type="checkbox" />
                    <p className="searchForm_checkbox-text">Короткометнажки</p>
                </div>
            </form>
        </div>
    )
}

export default SearchForm;
