function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock'); // Чтобы контент не скролился при открытом меню
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	})
}

const menuLinks = document.querySelectorAll('a[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', OnMenuLinkClick);
	});
	function OnMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			e.preventDefault();
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth'
			});
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}
		}
	}
}

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animForScroll);
	function animForScroll(params) {
		for (let i = 0; i < animItems.length; i++) {
			const animItem = animItems[i];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 20;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint - document.querySelector('header').offsetHeight) && pageYOffset < (animItemOffset + animItemHeight + document.querySelector('header').offsetHeight)) {
				animItem.classList.add('_animate');
			} else {

				animItem.classList.remove('_animate');

			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	animForScroll();
}



let popup = document.querySelector('.popup');
let popupBody = document.querySelector('.popup__body');
let popupContent = document.querySelector('.popup__content');
let openPopupButtons = document.querySelectorAll('.open-popup');
let closePopupButton = document.querySelector('.close-popup');

openPopupButtons.forEach((button) => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		popup.classList.add('open');
		popupContent.classList.add('open');
		document.body.classList.add('_lock');
	})
});

closePopupButton.addEventListener('click', (e) => {
	e.preventDefault();
	popup.classList.remove('open');
	popupContent.classList.remove('open');
	document.body.classList.remove('_lock');
});

document.addEventListener('click', (e) => {
	if (e.target === popupBody) {
		popup.classList.remove('open');
		popupContent.classList.remove('open');
		document.body.classList.remove('_lock');
	}
});



document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	const formBody = document.querySelector('.popup__content');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		let isFormValid = formValidate(form);

		let formData = new FormData(form);

		if (isFormValid === true) {
			formBody.classList.add('_sending');
			let url = '/index.php';
			let response = await fetch(url, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: formData,
			});

			if (response.ok) { // если ок отправлено - то сюда видимо попап спасибо за отправку
				let result = await response.json();
				alert(result.message);
				form.reset();
				formBody.classList.remove('_sending');
			} else {
				document.querySelector('.error').innerHTML += ' <span class="validation-error">Произошла ошибка при отправке формы</span>';
				formBody.classList.remove('_sending');
			}
		}
	}

	function formValidate(form) {
		let isFormValid = true;
		const errors = document.getElementsByClassName('validation-error');
		while (errors.length > 0) {
			errors[0].parentNode.removeChild(errors[0]);
		}
		const nameField = document.getElementById('name');
		if (!nameField.value) {
			document.querySelector('.error-name').innerHTML += ' <span class="validation-error">Enter your name</span>';
			isFormValid = false;
		}
		const emailField = document.getElementById('email');
		if (!emailField.value) {
			document.querySelector('.error-email').innerHTML += '<span class="validation-error">Enter your email</span>';
			isFormValid = false;
		} else {
			const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			if (!re.test(String(emailField.value).toLowerCase())) {
				document.querySelector('.error-email').innerHTML += ' <span class="validation-error">Incorrect email</span>';
				isFormValid = false;
			}
		}
		return isFormValid;
	}


});




