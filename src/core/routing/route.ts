import { renderDOM } from 'core';
import Block, { Component } from 'core/Block';

export default class Route {
    private _pathname: string;

    private _blockClass: Component;

	private _block: null | Block<{}>;

    private _props: Indexed;

    constructor(pathname: string, view: Component, props: Indexed) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

	render() {

            this._block = new this._blockClass(this._props);
            renderDOM(this._block);
    }
}
