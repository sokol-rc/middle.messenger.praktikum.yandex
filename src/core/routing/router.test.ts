import { Component } from 'core/Block';
import { initRouter } from '../../services/initApp';
import Route from './route';
import Router from './router';
import RegistrationPageContainer from '../../pages/registration/registrationContainer';

describe('core/touting/router', () => {
	const router = new Router('.app');
    it('should get Route object by pathname', () => {
        initRouter(router);

        const route = new Route('/sign-up', RegistrationPageContainer, {
            rootQuery: '.app',
        });

        const answer = router.getRoute('/sign-up');
        const flags = { shouldAuthorized: false, shouldNotAuthorized: true };
        expect(answer).toEqual({ route, flags });
    });

    it('Should add new route', () => {
        const routes = {
            path: '/new-path',
            component: RegistrationPageContainer,
        };
        const route = new Route('/new-path', RegistrationPageContainer, {
            rootQuery: '.app',
        });
        const { path, component } = routes;
        router.use(path, component as Component, {});
        const answer = router.getRoute('/new-path');
        console.log(answer);

        const flags = {};
        expect(answer).toEqual({ route, flags });
    });

    it('Shoult increment router history', () => {

        initRouter(router);

        router.go('/messenger');
        router.go('/settings');
        router.go('/500');
		// @ts-expect-error
        expect(router.history.length).toEqual(5);
    });
});
