import Block from 'core/Block';

type Props = {
    errorMessage: string;
}

export default class InputError extends Block<Props> {
    constructor({ ...props }: Props) {
        super({ ...props });
        this.setProps({ errorMessage: '' });
    }

    static componentName = 'InputError';

    protected render(): string {
        return `
		<div class="error-message">${this.props.errorMessage}</div>`;
    }
}
