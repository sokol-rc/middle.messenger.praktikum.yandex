const Patterns = {
	loginPattern: /^(?=.*[a-zA-Z-_])[0-9a-zA-Z_-]{3,20}$/,
	passwordPattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\s\S]{8,40}$/,
	personNamePattern: /^[A-ZА-ЯЁ][0-9a-zA-Zа-яёА-ЯЁ-]*$/,
	emailPattern: /^[a-zA-Z0-9-.]+[@]{1}[a-z0-9]+[.][a-z]+$/,
	phonePattern: /^[+|\d]{10,15}$/,
	messagePattern: /^[\s\S]{1,}$/,
};

export default Patterns;
