function open() {
	document.querySelector('.modal-confirm').classList.remove('modal--hidden');
	document.querySelector('.modal-confirm').classList.add('modal--opened');
}

function close() {
	document.querySelector('.modal-confirm').classList.remove('modal--opened');
	document.querySelector('.modal-confirm').classList.add('modal--hidden');
}


export const modalConfirm = {
	open: open,
	close: close,
}
