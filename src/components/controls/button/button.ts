import Block from 'core/Block';

import './button.css';

type IncomingProps = {
    label?: string;
    disable?: boolean;
    className?: string;
    onClick?: () => void;
};
type Props = {
    label?: string;
    disable?: boolean;
    className?: string;
    events?: {
        click?: () => void;
    };
};

export default class Button extends Block<Props> {
    constructor({ ...props }: IncomingProps) {
        super({ ...props, events: { click: props.onClick } });
    }

    static componentName = 'Button';

	render(): string {
		const label = this.props.label ?? 'Кнопка';
        return `<button class="{{className}}" type="submit" data-testid="btn-test">${label}</button>`;
    }
}
