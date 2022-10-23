import apiHasErrors from 'utils/api/api-has-errors';
import AuthApi from 'utils/api/auth-api';
import { checkAuthCookie } from './cookie';

const checkAuthApi = async () => { 
	const response = await AuthApi.user();
	if (apiHasErrors(response)) { 
		return false;
	}
	return true;
}


export const checkAuth = () => {

	if (!window.store.getState().isAuth && checkAuthApi()) {
		
		return false;
	}
	return true;

};
