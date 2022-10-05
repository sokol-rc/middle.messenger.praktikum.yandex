import Block from 'core/Block';
import './error.css';

type Props = {
    onClick?: () => void;
};

export default class Error extends Block<Props> {
    constructor(props: Props) {
        super(props);
        this.setProps({
            onClick: this.onClick.bind(this),
        });
    }

    static componentName: string = 'Error';

    onClick() {
        window.history.back();
    }

    render() {
        return `<div class="error-page">
					<div class="error-page__text error-page__text--error-style">
						{{value}}
					</div>
					<div class="error-page__return">
						<div class="return-button">
						{{{Button
							label="Вернуться"
							className="return-button__btn btn--submit-style btn"
							onClick=onClick
						}}}
						</div>
					</div>
				</div>`;
    }
}
