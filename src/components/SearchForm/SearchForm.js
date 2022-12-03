import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import './SearchForm.css';
import logoFind from '../../images/find_logo.svg';
import line from '../../images/input__strokeLine.svg'

function SearchForm({
    isLoading, 
    onSwitchCheckbox, 
    onFindMovies, 
    checked, 
    isSavePage}) {
    
    const [query, setQuery]=useState('')
    let queryLocal = ''
    if (isSavePage) {localStorage.getItem('querySave') ? queryLocal=localStorage.getItem('querySave') : queryLocal='';
    } else {
        localStorage.getItem('query') ? queryLocal = localStorage.getItem('query') : queryLocal='';
    }
    useEffect(() => {
        setQuery(queryLocal)
    }, [queryLocal])

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm ({
        mode: "onSubmit",
        defaultValues: {query: queryLocal}
    });

    const onSubmit=(data) =>{
        onFindMovies(data.query, checked)
    }
    function ChangeCheckbox() {
        onSwitchCheckbox(queryLocal);
    }
    
    return (
        <div className="searchForm">
            <form className="searchForm__container" onSubmit={handleSubmit(onSubmit)}>
                <div className="searchForm__film-container">
                    <input className="searchForm__input"
                        type="text"
                        placeholder='Фильм'
                        disabled={isLoading}
                        {...register('query', {
                            required: "Нужно ввести ключевое слово"
                        })}
                    />
                    {errors?.query && <span className='searchForm__error'>{errors.query.message}</span>}
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
