import { Component } from 'core/Block';
import { checkAuth } from 'services/auth';
import Route from './route';

export default class Router {
    private static __instance: Router;

    private routes!: Array<{ route: Route; flags: { [x: string]: boolean } }>;

    private history!: History;

    private _currentRoute!: Route | null;

    private _rootQuery!: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(
        pathname: string,
        block: Component,
        flags: { [x: string]: boolean },
        props = {}
    ) {
        const route = new Route(pathname, block, {
            ...props,
            rootQuery: this._rootQuery,
        });
        this.routes.push({ route, flags });

        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

	async _onRoute(pathname: string) {

        const routeWithFlags = this.getRoute(pathname);

        if (typeof routeWithFlags === 'undefined') {
            const errorPageRoute = this.getRoute('/404');

            if (typeof errorPageRoute !== 'undefined') {
                errorPageRoute.route.render();
            }
            return;
        }
        const { route, flags } = routeWithFlags;

        if (flags.shouldAuthorized && await checkAuth()) {
            this.go('/');
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.route.match(pathname));
    }
}
