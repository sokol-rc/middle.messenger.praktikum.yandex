/* eslint-disable */
import Block from 'core/Block';
import './error.css';

export class Error extends Block {
    static componentName: string = 'Error';
    render() {
        return `<div class="error-page">
					<div class="error-page__text error-page__text--error-style">
						{{value}}
					</div>
					<div class="error-page__return">
						<div class="return-button">
							<button class="return-button__btn btn--submit-style btn" onclick="window.history.back()">Вернуться</button>
						</div>
					</div>
				</div>`;
    }
}
