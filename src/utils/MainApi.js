import { BASE_URL_image } from '../utils/constants';
//export const BASE_URL = 'https://api.mironenko.diploma.nomoredomains.icu';
export const BASE_URL = 'http://localhost:3000';

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject('Ошибка: $(res.status)');
    }
}

function setToken(res) {
    if (res.token) {
        localStorage.setItem('jwt', res.token);
        return res;
    }
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, password, email})
    })
        .then(handleResponse)
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email })
    })
        .then(handleResponse)
        .then(setToken)
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(handleResponse)
}

export const getUserData = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        },
    })
        .then(handleResponse)
};

export const editUserData = (data) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
        }),
    })
        .then(handleResponse)
}

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
}

export const saveMovie = (data) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify ({
            nameRU: data.nameRU || '',
            country: data.country || '',
            director: data.director || '',
            duration: data.duration || '',
            year: data.year || '',
            description: data.description || '',
            image: `${BASE_URL_image}${data.image.url}` || '',
            trailerLink: data.trailerLink || '',
            thumbnail: `${BASE_URL_image}${data.image.formats.thumbnail.url}` || '',
            movieId: data.id,
            nameEN: data.nameEN
        })
    })
    .then(handleResponse);
};

export const deleteMovie = (data) => {
    return fetch(`${BASE_URL}/movies/${data._id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
        },
    })
    .then(handleResponse)
};
