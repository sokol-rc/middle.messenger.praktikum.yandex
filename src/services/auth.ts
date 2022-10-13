import apiHasErrors from "utils/api/api-has-errors";
import { transformUser } from "utils/api/apiTransformers";
import AuthApi from "utils/api/auth-api";


export const logout = async (dispatch: Dispatch<AppState>) => {
	dispatch({ isLoading: true });
  
	await AuthApi.logout();
  
	dispatch({ isLoading: false, user: null });
  
	window.router.go('/login');
  };

export const login = async (dispatch, state, payload) => { 
	dispatch({ isLoading: true });

	const response = await AuthApi.signin({data: payload});

	if (apiHasErrors(response)) {
		console.log(response.responseText);
		
		dispatch({
			isLoading: false,
			loginFormError: response.reason,
		});
		return false;
	}

	const responseUser = await AuthApi.user();
	console.log(responseUser);
	
	dispatch({ isLoading: false, loginFormError: null });

	if (apiHasErrors(responseUser)) {
		console.log(responseUser.responseText);
		dispatch(logout);
		return false;
	}

	dispatch({ user: transformUser(responseUser) })
	
	//window.router.go('/');
	return true;

}
