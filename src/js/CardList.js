export default class CardList {

	constructor(DOM) {
			this.DOM = DOM;
	}

	addCard(card, api, picName, picLink) {
			api.postNewCard(picName, picLink);
			return api.getPicturesFromServer()
					.then(array => {
							let i = array.length - 1;
							while (array[i].owner._id !== 'bda2fc246df305d6159eb0da') {
									i -= 1;
							}
							const item = array[i];
							this.DOM.insertAdjacentHTML('afterbegin', card.myCard(item.name, item.link, item._id, item.likes.length));  
					});
	}
	render(card, api, userId) {
		api.getPicturesFromServer()
				.then(array => {
						let i = 0;
						for (let data of array) {
							if (data.owner._id === 'bda2fc246df305d6159eb0da') {
							this.DOM.insertAdjacentHTML('afterbegin', card.myCard(data.name, data.link, data._id, data.likes.length));
							this.putLikes(card, data, userId);
							} else {
							this.DOM.insertAdjacentHTML('beforeend', card.notMyCard(data.name, data.link, data._id, data.likes.length));
							this.putLikes(card, data, userId);
						}
					}
			});
	}

	putLikes(card, data, userId) {
			if (card.isLiked(data, userId)) {
					this.DOM.lastChild.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
			}
	}

};		




