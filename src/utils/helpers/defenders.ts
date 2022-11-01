import { ActionsTypes, doLogout } from 'reducers/authReducer';
import {
    getDosCookie,
    setInitialDosCookie,
    setTimeoutDosCookie,
    updateDosCounter,
} from 'services/cookie';

export const antiXSS = (text: string) => {
    const lt = /</g;
    const gt = />/g;
    const ap = /'/g;
    const ic = /"/g;
    const value = text
        .replace(lt, '&lt;')
        .replace(gt, '&gt;')
        .replace(ap, '&#39;')
        .replace(ic, '&#34;');
    return value;
};

export const antiDOS = () => {
    const dosCookies = getDosCookie();
    if (dosCookies && typeof dosCookies.dosTimeout !== 'undefined') {
        // eslint-disable-next-line no-alert
        alert('всё. теперь ждать минуту');
        return false;
    }

    if (dosCookies && typeof dosCookies.dosCounter !== 'undefined') {
        const counter = Number(dosCookies.dosCounter);

        if (counter > 5) {
            // eslint-disable-next-line no-alert
            alert('АнтиДос. Слишком много запросов. Еще 5 раз и logout');
        }
        if (counter > 10) {
            setTimeoutDosCookie();
            window.store.dispatch(() => doLogout() as unknown as ActionsTypes);
        }
        updateDosCounter(counter + 1);
    } else {
        setInitialDosCookie();
    }
    return true;
};
