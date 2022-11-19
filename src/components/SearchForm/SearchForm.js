import React from 'react';
import {useForm} from 'react-hook-form';
import './SearchForm.css';
import logoFind from '../../images/find_logo.svg';
import line from '../../images/input__strokeLine.svg'

function SearchForm({
    isLoading, 
    onSwitchCheckbox, 
    onFindMovies, 
    checked, 
    isSaved}) {
    
    let searchTextLocal = ''
    if (isSaved) {localStorage.getItem('textSave') ? searchTextLocal=localStorage.getItem('textSave') : searchTextLocal='';
    } else {
        localStorage.getItem('text') ? searchTextLocal = localStorage.getItem('text') : searchTextLocal='';
    } 

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm ({
        mode: "onSubmit",
        defaultValues: {searchText: searchTextLocal}
    });

    const onSubmit=(data) =>{
        onFindMovies(data.searchText, checked)
    }
    function ChangeCheckbox() {
        onSwitchCheckbox(searchTextLocal);
    }

    return (
        <div className="searchForm">
            <form className="searchForm__container" onSubmit={handleSubmit(onSubmit)}>
                <div className="searchForm__film-container">
                    <input className="searchForm__input"
                        type="text"
                        placeholder='Фильм'
                        disabled={isLoading}
                        {...register('searchText', {
                            required: "Нужно ввести ключевое слово"
                        })}
                    />
                    {errors?.searchText && <span className='searchForm__error'>{errors.searchText.message}</span>}
                    <button className="searchForm__button" type="submit" disabled={isLoading}>
                        <img className="searchForm__logo" alt="Логотип поиска" src={logoFind} />
                    </button>
                </div>
                <img className="searchForm__line" alt="Декоративный элемент" src={line} />
                <div className="searchForm__checkbox-container">
                    <input className="searchForm__checkbox"
                        type="checkbox"
                        id="searchForm_checkbox"
                        name="checkbox" 
                        checked={checked}
                        onChange={ChangeCheckbox}/>
                    <p className="searchForm_checkbox-text">Короткометнажки</p>
                </div>
            </form>
        </div>
    )
}

export default SearchForm;
