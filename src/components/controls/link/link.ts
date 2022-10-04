/* eslint-disable */
import Block from 'core/Block';

interface InputProps {
    href: string;
    label?: string;
    className?: string;
    target?: string;
}

export class Link extends Block {
    constructor(props: InputProps) {
        super(props);
    }
    static componentName = 'Link';

    render(): string {
        const target = this.props.target ? `target="${this.props.target}"` : ``;

        return `<a class="{{className}}" href="{{href}}" ${target}>{{label}}</a>`;
    }
}
