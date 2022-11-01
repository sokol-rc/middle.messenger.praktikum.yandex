import Block from 'core/Block';

type Props = {
    className?: string;
    placeholder?: string;
    onInput: () => void;
    onKeydown: () => void;
    value: string;
    events: {
        input: () => void;
        keydown: () => void;
    };
};

export default class DivLikeInput extends Block<Props> {
    constructor({ ...props }: Props) {
        super({
            ...props,
            events: {
                input: props.onInput,
                keydown: props.onKeydown,
            },
            value: '',
        });
    }

    static get componentName(): string {
        return 'DivLikeInput';
    }

    render(): string {
        const { className, placeholder } = this.props;
        return `<div
			class="${className}"
			data-placeholder="${placeholder}"
			contentEditable="true"
			tabindex="0"
		  ></div>`;
    }
}
