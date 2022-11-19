export const BASE_URL_BEATFILM = 'https://api.nomoreparties.co/beatfilm-movies'

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject('Ошибка: $(res.status)');
    }
}

export const getMovie =() => {
    return fetch(`${BASE_URL_BEATFILM}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(handleResponse);
}