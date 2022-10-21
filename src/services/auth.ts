import { checkAuthCookie } from './cookie';


export const checkAuth = () => {

	if (!window.store.getState().isAuth && !checkAuthCookie()) {
		return false;
	}
	return true;

};
