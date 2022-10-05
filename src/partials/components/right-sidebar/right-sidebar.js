function toogle(event, elemClassName) {
	const elem = document.querySelector(`.${elemClassName}`);
	if (!('status' in elem.dataset) || elem.dataset.status === 'closed') {
		open(elemClassName);
		elem.dataset.status = 'opened';
	} else {
		close(elemClassName);
		elem.dataset.status = 'closed';
	}
	
}

function open(elemClassName) {
	const elem = document.querySelector(`.${elemClassName}`);
	elem.classList.remove(`${elemClassName}--hidden`);
	elem.classList.add(`${elemClassName}--opening`);
	setTimeout(function(){
		elem.classList.add(`${elemClassName}--opened`);
	},100);
}
function close(elemClassName) {
	const elem = document.querySelector(`.${elemClassName}`);
	elem.classList.remove(`${elemClassName}--opened`);
	elem.classList.add(`${elemClassName}--hiddening`);
	setTimeout(function(){
		elem.classList.add(`${elemClassName}--hidden`);
	},100);
}

export const sidebarRight = {
	toogle: toogle,
}
