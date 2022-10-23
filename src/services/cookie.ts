const getCookie = (name) => {
    let matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)'
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (name, value, seconds) => {
    let date = new Date(new Date().getTime() + seconds * 1000);
    date = date.toUTCString();
    document.cookie = name + '=' + value + ';path=/;expires=' + date + '}';
};

const deleteCookie = (name) => {
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
