const getCookie = (name: string) => {
    const matches = document.cookie.match(
        new RegExp(
            `(?:^|; )${name.replace(
                // eslint-disable-next-line no-useless-escape
                /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
                '\\$1'
            )}=([^;]*)`
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (
    name: string,
    value: string | number,
    seconds: number = -1
) => {
    if (seconds === -1) {
        document.cookie = `${name}=${value};}`;
        return;
    }
    const date = new Date(new Date().getTime() + seconds * 1000);
    const dateString = date.toUTCString();
    document.cookie = `${name}=${value};path=/;expires=${dateString}}`;
};

const deleteCookie = (name: string) => {
    setCookie(name, '', 0);
};

export const checkAuthCookie = () => {
    const authCookie = getCookie('isAuth');
    if (authCookie === '1') {
        return true;
    }
    return false;
};

export const setAuthCookie = () => {
    setCookie('isAuth', 1, 60 * 60 * 24);
};

export const deleteAuthCookie = () => {
    deleteCookie('isAuth');
};

export const getDosCookie = () => {
    const dosOn = getCookie('DOSon');
    if (dosOn === '1') {
		return {dosCounter: getCookie('DOScounter'), dosTimeout: getCookie('DOStimeout')};
    }
    return false;
};

export const setInitialDosCookie = () => {
    setCookie('DOSon', 1, 60 * 60 * 24);
    setCookie('DOScounter', 1, 10);
};

export const updateDosCounter = (counter: number) => {
    setCookie('DOScounter', counter, 10);
};

export const setTimeoutDosCookie = () => { 
	setCookie('DOStimeout', 1, 60);
}
