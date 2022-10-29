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
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({ name, password, email })
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
        credentials: 'include',
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

export const editUserData = (formData) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
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

export const saveMovie = (dataMovie) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify ({
            nameRU: dataMovie.nameRU,
            country: dataMovie.country,
            director: dataMovie.director,
            duration: dataMovie.duration,
            year: dataMovie.year,
            description: dataMovie.description,
            image: dataMovie.image.url,
            trailerLink: dataMovie.trailerLink,
            thumbnail: dataMovie.image.formats.thumbnail.url,
            movieId: dataMovie.id,
            nameEN: dataMovie.nameEN
        })
    })
    .then(handleResponse)
};

export const deleteMovie = (dataMovie) => {
    return fetch(`${BASE_URL}/movies/${dataMovie._id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
        },
    })
    .then(handleResponse)
};
