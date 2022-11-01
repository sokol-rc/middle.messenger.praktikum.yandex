import AuthApi from 'utils/api/auth-api';

const isAuthApi = async () => { 
	const response = await AuthApi.user();
	if (response.status !== 200) { 
		return false;
	}
	return true;
}


export const isAuthorized = async () => {
	
	if (await isAuthApi()) {
		return true;
	}
	return false;

};
