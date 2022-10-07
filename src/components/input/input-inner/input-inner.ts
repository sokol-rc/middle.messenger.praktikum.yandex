import Block from 'core/Block';

type IncomingProps = {
    id: number;
    type?: string;
    name?: string;
    className?: string;
    placeholder?: string;
    pattern?: RegExp;
    onBlur: () => void;
    onFocus: () => void;
};

type Props = IncomingProps & {
    value: string;
    events: { [x: string]: () => void };
};

export default class InputInner extends Block<Props> {
    constructor({ ...props }: IncomingProps) {
        super({
            ...props,
            events: {
                blur: props.onBlur,
                focus: props.onFocus,
            },
            value: '',
        });
    }

    static get componentName(): string {
        return 'InputInner';
    }

    protected render(): string {
        return `
			<input
			class="${this.props.className}"
			id="${this.props.id}"
			type="${this.props.type}"
			placeholder="${this.props.placeholder}"
			name="${this.props.name}"
			value="${this.props.value}">`;
    }
}
