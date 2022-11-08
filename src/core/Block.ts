import { nanoid } from 'nanoid';
import EventBus from './EventBus';
// import Handlebars from 'handlebars';
const Handlebars = require('handlebars');

type Events = Values<typeof Block.EVENTS>;

export default class Block<P extends Record<string, any>> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_CWU: 'flow:component-will-unmount',
        FLOW_RENDER: 'flow:render',
    } as const;

    static componentName: string;

    public id = nanoid(6);

    protected _element: Nullable<HTMLElement> = null;

    protected readonly props: P;

    protected children: { [id: string]: Block<{}> } = {};

    eventBus: () => EventBus<Events>;

    protected refs: { [key: string]: Block<{}> } = {};

    public constructor(props?: P) {
        const eventBus = new EventBus<Events>();

        this.props = this._makePropsProxy(props || ({} as P));

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT, this.props);
    }

    _registerEvents(eventBus: EventBus<Events>) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(
            Block.EVENTS.FLOW_CWU,
            this._componentWillUnmount.bind(this)
        );
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        this._element = this._createDocumentElement('div');
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
    }

    _componentDidMount() {
        this._checkInDom();
        this.componentDidMount();
    }

    _componentWillUnmount() {
        this.eventBus().destroy();
        this.componentWillUnmount();
    }

    componentWillUnmount() {}

    componentDidMount() {}

    _componentDidUpdate() {
        const response = true;
        if (!response) {
            return;
        }
        this._render();
    }

    getRefs() {
        return this.refs;
    }

    getProps() {
        return this.props;
    }

    setProps(nextProps: Partial<P>) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    get element() {
        return this._element;
    }

    _checkInDom() {
        const elementInDOM = document.body.contains(this._element);

        if (elementInDOM) {
            setTimeout(() => this._checkInDom(), 1000);
            return;
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
    }

    _render() {
        const fragment = this._compile();

        this._removeEvents();
        const newElement = fragment.firstElementChild!;

        this._element!.replaceWith(newElement);

        this._element = newElement as HTMLElement;
        this._addEvents();
    }

    protected render(): string {
        return '';
    }

    getContent(): HTMLElement {
        if (
            this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE
        ) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !==
                    Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
                }
            }, 200);
        }

        return this.element!;
    }

    _makePropsProxy(props: P): P {
        const self = this;
        let waitProxy = false;

        return new Proxy(props as unknown as object, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, unknown>, prop: string, value: unknown) {
                if (
                    typeof target[prop] !== 'undefined' &&
                    value === target[prop]
                ) {
                    return true;
                }
                target[prop] = value;
                if (!waitProxy) {
                    waitProxy = true;
                    setTimeout(() => {
                        self.eventBus().emit(Block.EVENTS.FLOW_CDU, target);
                        waitProxy = false;
                    }, 100);
                }

                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        }) as unknown as P;
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    _removeEvents() {
        const { events } = this.props as P;

        if (!events || !this._element) {
            return;
        }

        Object.keys(events).forEach((eventKey) => {
            if (this._element) {
                this._element.removeEventListener(eventKey, events[eventKey]);
            }
        });
    }

    _addEvents() {
        const { events = {} } = this.props as P;

        if (!events) {
            return;
        }

        Object.keys(events).forEach((eventKey) => {
            if (this._element) {
                this._element.addEventListener(eventKey, events[eventKey]);
            }
        });
    }

    _compile(): DocumentFragment {
        const fragment = document.createElement('template');
        const template = Handlebars.compile(this.render());

        fragment.innerHTML = template({
            ...this.props,
            children: this.children,
            refs: this.refs,
        });

        Object.entries(this.children).forEach(([id, component]) => {
            const stub = fragment.content.querySelector(`[data-id="${id}"]`);

            if (!stub) {
                return;
            }

            const stubChilds = stub.childNodes.length ? stub.childNodes : [];

            const content = component.getContent();
            stub.replaceWith(content);

            const layoutContent = content.querySelector('[data-cont="1"]');
            if (layoutContent && stubChilds.length) {
                content.append(...stubChilds);
                layoutContent.remove();
            }
        });

        return fragment.content;
    }

    hide() {
        if (this._element) {
            this.eventBus().emit(Block.EVENTS.FLOW_CWU);
            this._element.remove();
        }
    }
}

export type Component = typeof Block;
