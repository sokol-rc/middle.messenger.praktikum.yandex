import Block from 'core/Block';

type IncomingProps = {
    id: number;
    type?: string;
    name?: string;
    className?: string;
    placeholder?: string;
    inputType?: string;
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

    render(): string {
        const { className, id, type, placeholder, name, value, inputType } =
            this.props;
        if (typeof inputType !== 'undefined' && inputType === 'textarea') {
            return `
			<textarea
			class="${className}"
			id="${id}"
			type="${type}"
			placeholder="${placeholder}"
			name="${name}"
			value="${value}">`;
        }
        return `
			<input
			class="${className}"
			id="${id}"
			type="${type}"
			placeholder="${placeholder}"
			name="${name}"
			value="${value}">`;
    }
}
