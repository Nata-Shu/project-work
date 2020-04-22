export default class Api {

	constructor(url, cohort9, token) {
		this.server = `${url}/${cohort9}`;
		this.token = token;
	}

	getUserInfoFromServer() {
			return fetch(`${this.server}/users/me`, {
					headers: {
							authorization: this.token,
					},
			})
					.then(res => {
							if (res.ok) 
							  return res.json();
							  return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
					});
	}

	getUserInfo(newUserName, newUserAbout) {
    
			return fetch(`${this.server}/users/me`, {
					method: 'PATCH',
					headers: {
							authorization: this.token,
							'Content-Type': 'application/json',
					},
					body: JSON.stringify({
							'name': `${newUserName}`,
							'about': `${newUserAbout}`,
					}),
			})
					.then(res => {
							if (res.ok) return res.json();
							return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
					});
	}

	getPicturesFromServer() {
			return fetch(`${this.server}/cards`, {
					headers: {
							authorization: this.token
					},
			})
					.then(res => {
							if (res.ok) return res.json();
							return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
					});
	}

	postNewCard(name, link) {
			return fetch(`${this.server}/cards`, {
					method: 'POST',
					headers: {
							authorization: this.token,
							'Content-Type': 'application/json',
					},
					body: JSON.stringify({
							'name': `${name}`,
							'link': `${link}`,
					}),
			})
					.then(res => {
							if (res.ok) return res.json();
							return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
					});
	}

	deleteCardFromServer(_id) {
			return fetch(`${this.server}/cards/${_id}`, {
					method: 'DELETE',
					headers: {
							authorization: this.token,
					},
			})
					.then(res => {
							if (res.ok) return res.json();
							return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
					});
	}

	putLike(_id) {
			return fetch(`${this.server}/cards/like/${_id}`, {
					method: 'PUT',
					headers: {
							authorization: this.token,
					},
			})
					.then(res => {
							if (res.ok) return res.json();
							return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
					});
	}

	deleteLike(_id) {
			return fetch(`${this.server}/cards/like/${_id}`, {
					method: 'DELETE',
					headers: {
							authorization: this.token,
					},
			})
					.then(res => {
							if (res.ok) return res.json();
							return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
					});
	}

	getAvatar() {
			return fetch(`${this.server}/users/me/`, {
					headers: {
							authorization: this.token,
					},
			})
					.then(res => {
							if (res.ok) return res.json();
							return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
					});
	}

	patchAvatar(newUrl) {
			return fetch(`${this.server}/users/me/avatar`, {
					method: 'PATCH',
					headers: {
							authorization: this.token,
							'Content-Type': 'application/json',
					},
					body: JSON.stringify({
							'avatar': `${newUrl}`,
					}),
			})
					.then(res => {
							if (res.ok) return res.json();
							return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
					});
	}
}
