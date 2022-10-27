class Api {
    constructor(options) {
        this.url = options.url
        // this.headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject('Ошибка');
        }
    }
    getUserData() {
        return fetch(this.url + '/users/me', {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
            .then(this._handleResponse)
    }

    editUserData(formData) {
        return fetch(this.url + '/users/me', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: formData.name,
                about: formData.about,
            }),
        })
            .then(this._handleResponse)
    }

    getInitialCards() {
        return fetch(this.url + '/cards', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
            .then(this._handleResponse)
    }

    addNewCard(newCard) {
        return fetch(this.url + '/cards/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
            }),
        })
            .then(this._handleResponse)
    }

    DeleteCard(idCard) {
        // eslint-disable-next-line no-useless-concat
        return fetch(this.url + '/cards/' + idCard, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(this._handleResponse)
    }
    editUserAvatar(formData) {
        return fetch(this.url + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                avatar: formData,
            })
        })
            .then(this._handleResponse)
    }
    
    handleLikeCard(idCard, like) {
        return fetch(this.url + '/cards/' + idCard + '/likes', {
            method: like ? 'PUT' : 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(this._handleResponse)
    }
}

export const api = new Api({
    url: 'http://localhost:3000',
});
