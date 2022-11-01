import Router from 'core/routing/router';
import { Component } from 'core/Block';
import LoginPageContainer from '../pages/login/loginContainer';
import RegistrationPageContainer from '../pages/registration/registrationContainer';
import ErrorPage from '../pages/errorPage';
import ChatPageContainer from '../pages/chat/chatContainer';
import ProfilePageContainer from '../pages/profile/profileContainer';

export const initRouter = (router: Router) => {
    const routes = [
        {
            path: '/',
            component: LoginPageContainer,
			shouldAuthorized: false,
			shouldNotAuthorized: true,
        },
        {
            path: '/sign-up',
            component: RegistrationPageContainer,
			shouldAuthorized: false,
			shouldNotAuthorized: true,
        },
        {
            path: '/404',
            component: ErrorPage,
			shouldAuthorized: false,
			shouldNotAuthorized: false,
            props: {
                errorNumber: 404,
            },
        },
        {
            path: '/500',
            component: ErrorPage,
			shouldAuthorized: false,
			shouldNotAuthorized: false,
            props: {
                errorNumber: 500,
            },
        },
        {
            path: '/messenger',
            component: ChatPageContainer,
			shouldAuthorized: true,
			shouldNotAuthorized: false,
        },
        {
            path: '/settings',
            component: ProfilePageContainer,
			shouldAuthorized: true,
			shouldNotAuthorized: false,
        },
    ];

    routes.forEach((route) => {
        const { path, component, shouldAuthorized, shouldNotAuthorized, props = {} } = route;
        router.use(path, component as Component, { shouldAuthorized, shouldNotAuthorized }, props);
    });

    router.start();
};
