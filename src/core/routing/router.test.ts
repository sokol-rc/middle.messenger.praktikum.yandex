import { Component } from 'core/Block';
import LoginPageContainer from '../../pages/login/loginContainer';
import Route from './route';
import Router from './router';

describe('core/touting/router', () => {
    const router = new Router('.app');
    it('should get Route object by pathname', () => {
        router.use('/', LoginPageContainer, {});

        const answer = router.getRoute('/');
        // @ts-ignore
        expect(answer?.route._pathname).toBe('/');
    });

    test('Should add new route', () => {
        const routes = {
            path: '/new-path',
            component: LoginPageContainer,
        };
        const route = new Route('/new-path', LoginPageContainer, {
            rootQuery: '.app',
        });
        const { path, component } = routes;
        router.use(path, component as Component, {});
        const answer = router.getRoute('/new-path');

        const flags = {};
        expect(answer).toEqual({ route, flags });
    });
});
