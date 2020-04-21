class FormValidator {

	constructor(id) {
			id.forEach((item) => {
					this[`${item}Element`] = document.querySelector(`#${item}`);
			})
	}

	checkInputValidity(event) {
			this.validation(event.target);
			this.allValid(event.target);
	}

	allValid(formElement) {

			const inputs = Array.from(formElement.form.elements);

			let isFormValid = true;

			inputs.forEach(elem => {
					if (elem.id !== 'submit') {
							if (!this.validation(elem)) isFormValid = false;
					};
			});

			this.setSubmitButtonState(isFormValid);
	}

	validation(element) {
			const errorElement = document.querySelector(`#error-${element.id}`);
			if (!element.checkValidity()) {
					this.activateError(errorElement, element);
					return false;
			};
			if (element.value.length === 0) {
					this.activateError(errorElement, element);
					return false;
			};
			if (element.checkValidity()) {
					this.removeError(errorElement, element);
					return true;
			};
	}

	activateError(errorElement, element) {
			errorElement.textContent = this.errorMessage(element);
			element.classList.remove('popup__input_valid');
			element.classList.add('popup__input_invalid');
			errorElement.style = null;
	}

	removeError(errorElement, element) {
			element.classList.remove('popup__input_invalid');
			element.classList.add('popup__input_valid');
			errorElement.style.display = 'none';
	}

	errorMessage(element) {
			switch (element.name) {
					case 'name':
					case 'authorName':
					case 'about':
							if (element.value.length === 0) return 'Это обязательное поле';
							if (element.value.length === 1) return 'Должно быть от 2 до 30 символов';
							break
					case 'link':
					case 'avatarLink':
							if (element.value.length === 0) {
									return 'Это обязательное поле';
							} else {
									return 'Здесь должна быть ссылка';
							};
			};
	}

	setSubmitButtonState(isFormValid) {
			if (isFormValid) {
					return event.target.form.submit.removeAttribute('disabled');
			};
			if (!(isFormValid && event.target.form.submit.hasAttribute('disabled'))) {
					return event.target.form.submit.setAttribute('disabled', true);
			};
	}

	setEventListeners() {
			let temp = Object.entries(this).sort((a, b) => {a[0] - b[0]})
			temp.forEach(item => {
					item[1].addEventListener('input', () => {
							this.checkInputValidity.call(this, event);
					});
			})
	}

};