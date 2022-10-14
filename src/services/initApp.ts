import { checkAuth } from './auth';
import LoginPageContainer from '../pages/login/loginContainer';
import RegistrationPage from '../pages/registration';
import ErrorPage from '../pages/errorPage';
import ChatPage from '../pages/chat';
import ProfilePageContainer from '../pages/profile/profileContainer';

const initApp = () => {
    const localUserData: string | null = localStorage.getItem('user');
    if (localUserData !== null) {
        const userDataObject = JSON.parse(localUserData);
        window.store.dispatch({ user: userDataObject });
        window.store.dispatch({ isAuthLocal: true });
        window.store.dispatch(checkAuth);

        return undefined;
    }
};

export const initRouter = (router, store) => {
    const routes = [
        {
            path: '/login',
			component: LoginPageContainer,
			shouldAuthorized: false,
            
        },
        {
            path: '/registration',
            component: RegistrationPage,
			shouldAuthorized: false,
        },
        {
            path: '/404',
			component: ErrorPage,
			shouldAuthorized: false,
			props: {
				errorNumber: 404
			}
        },
        {
            path: '/500',
			component: ErrorPage,
			shouldAuthorized: false,
			props: {
				errorNumber: 500
			}
        },
        {
            path: '/',
            component: ChatPage,
			shouldAuthorized: true,
        },
        {
            path: '/profile',
			component: ProfilePageContainer,
			shouldAuthorized: true,
        },
	];
	
	routes.forEach((route) => { 
		const { path, component, shouldAuthorized, props = {} } = route;
		router.use(path, component, {shouldAuthorized}, props)
	})

	router.start();

};

export default initApp;
