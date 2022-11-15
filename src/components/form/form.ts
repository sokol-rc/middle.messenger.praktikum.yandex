import Block from 'core/Block';

type IncomingProps = {
    className?: string;
    onSubmit: () => void;
};
type Props = IncomingProps & {
    events: {
        submit: () => void;
    };
};

export default class Form extends Block<Props> {
    constructor({ ...props }: IncomingProps) {
        super({ ...props, events: { submit: props.onSubmit } });
    }

    static componentName = 'Form';

    protected render(): string {
        return `<form data-testid="loginForm" class="{{className}}" action="">
		<div data-cont="1"></div>

	</form> `;
    }
}
