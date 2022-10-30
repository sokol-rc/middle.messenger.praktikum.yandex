import Block from 'core/Block';

type Props = {
    href: string;
    label?: string;
    className?: string;
    target?: string;
};

export default class Link extends Block<Props> {
    static componentName = 'Link';

    render(): string {
        const target = this.props.target ? `target="${this.props.target}"` : ``;

        return `<a class="{{className}}" href="" onclick="window.router.go('{{href}}');return false;" ${target}>{{label}}</a>`;
    }
}
