import AuthApi from 'utils/api/auth-api';
import { apiHasErrors } from 'utils/typeGuards/typeGuards';

const checkAuthApi = async () => { 
	const response = await AuthApi.user();
	if (apiHasErrors(response)) { 
		return false;
	}
	return true;
}


export const checkAuth = async () => {

	if (!window.store.getState().isAuth && await checkAuthApi()) {
		
		return false;
	}
	return true;

};
