import apiHasErrors from 'utils/api/api-has-errors';
import { transformUser } from 'utils/api/apiTransformers';
import AuthApi from 'utils/api/auth-api';



export const logout = async (dispatch: Dispatch<AppState>) => {
    dispatch({ isLoading: true });

    localStorage.removeItem('user');

    await AuthApi.logout();

    dispatch({ isLoading: false, isAuthLocal: false, user: {} });

    window.router.go('/login');
};

export const login = async (dispatch, state, payload) => {
    dispatch({ isLoading: true });

    const response = await AuthApi.signin({ data: payload });
    console.log(apiHasErrors(response));
    if (apiHasErrors(response)) {
        console.log(response.responseText);
        const { reason } = JSON.parse(response.responseText);
        dispatch({
            isLoading: false,
            loginFormError: reason,
        });
        return false;
    }

    const responseUser = await AuthApi.user();

    dispatch({ isLoading: false, loginFormError: '' });

    if (apiHasErrors(responseUser)) {
        console.log(responseUser.responseText);
        dispatch(logout);
        return false;
    }

    const userTransferedObject = transformUser(responseUser.responseText);

    localStorage.setItem('user', JSON.stringify(userTransferedObject));

    dispatch({ user: userTransferedObject });

    window.router.go('/');
    return true;
};

export const checkAuth = async (dispatch: Dispatch<AppState>) => {
    dispatch({ isLoading: true });

	const response = await AuthApi.user();
	
	dispatch({ isLoading: false });

	if (apiHasErrors(response)) {
		dispatch(logout);
        return false;
	}
	
	dispatch({ isAuthSynchronized: true });
	return true;

};
