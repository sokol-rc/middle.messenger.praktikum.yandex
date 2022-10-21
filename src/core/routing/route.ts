import { renderDOM } from 'core';
import isEqual from 'utils/helpers/isequal';

export default class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            //    this._block.hide();
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

	render() {
		
        if (!this._block) {
            this._block = new this._blockClass(this._props);
            renderDOM(this._block);
            return;
        }

        this._block.show();
        renderDOM(this._block);
    }
}
