/* eslint-disable */
import Block from 'core/Block';
import './message-preview.css';

export class MessagePreview extends Block {

    static componentName = 'MessagePreview';

    protected render(): string {
        return `<div class="message-preview">
		<span class="message-preview__text">Привет! я тут погляжу ты чат рисуешь. А вот внизу там
			криво, и контраст местами такой...</span>
	</div>`;
    }
}
