import LoginPageContainer from '../pages/login/loginContainer';
import RegistrationPageContainer from '../pages/registration/registrationContainer';
import ErrorPage from '../pages/errorPage';
import ChatPageContainer from '../pages/chat/chatContainer';
import ChatPage from '../pages/chat/chat';
import ProfilePageContainer from '../pages/profile/profileContainer';
import { checkAuth, setIsAuthLocal, setUser } from '../reducers/authReducer';

const initApp = () => {
    const localUserData: string | null = localStorage.getItem('user');
    if (localUserData !== null) {
        const userDataObject = JSON.parse(localUserData);
		window.store.dispatch(() => setUser(userDataObject));
        window.store.dispatch(() => setIsAuthLocal(true));
		window.store.dispatch(checkAuth);

        return undefined;
    }
};

export const initRouter = (router, store) => {
    const routes = [
        {
            path: '/',
			component: LoginPageContainer,
			shouldAuthorized: false,
            
        },
        {
            path: '/sign-up',
            component: RegistrationPageContainer,
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
            path: '/messenger',
            component: ChatPageContainer,
			shouldAuthorized: true,
        },
        {
            path: '/settings',
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
