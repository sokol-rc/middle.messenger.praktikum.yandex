import Block from 'core/Block';

type Props = {
    errorMessage?: string;
    isShowed?: boolean;
};

export default class InputError extends Block<Props> {
    constructor({ ...props }: Props) {
        super({ ...props });
        this.setProps({ isShowed: false });
    }

    static componentName = 'InputError';

    protected render(): string {
        return `
		<div class="error-message">${
            this.props.isShowed ? this.props.errorMessage : ''
        }</div>`;
    }
}
