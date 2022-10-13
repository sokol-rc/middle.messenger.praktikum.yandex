import Route from './route';

export default class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

	use(pathname, block, props = {}) {
		const route = new Route(pathname, block, {
			...props,
            rootQuery: this._rootQuery,
        });
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        const errorPageRoute = this.getRoute('/404');
		console.log(route);
		
        if (typeof route === 'undefined') {
            this.history.pushState({}, '', pathname);
            errorPageRoute.render(errorPageRoute, pathname);
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname) {
        return this.routes.find((route) => route.match(pathname));
    }
}

//   // Необходимо оставить в силу особенностей тренажёра
//   history.pushState({}, '', '/');

//   const router = new Router(".app");

//   // Можно обновиться на /user и получить сразу пользователя
//   router
// 	.use("/", Chats)
// 	.use("/users", Users)
// 	.start();

//   // Через секунду контент изменится сам, достаточно дёрнуть переход
//   setTimeout(() => {
// 	router.go("/users");
//   }, 1000);

//   // А можно и назад
//   setTimeout(() => {
// 	router.back();
//   }, 3000);

//   // И снова вперёд
//   setTimeout(() => {
// 	router.forward();
//   }, 5000);
