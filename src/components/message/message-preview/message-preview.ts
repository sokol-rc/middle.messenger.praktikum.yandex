import Block from 'core/Block';
import './message-preview.css';

export default class MessagePreview extends Block<{}> {
    static componentName = 'MessagePreview';

    protected render(): string {
        return `<div class="message-preview">
		<span class="message-preview__text">${this.props.message}</span>
	</div>`;
    }
}
