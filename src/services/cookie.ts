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

const setCookie = (name: string, value: string | number, seconds: number) => {
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
