import Block from 'core/Block';
import './chat-item.css';

type Props = {
	avatar?: string;
	personName?: string;
	time?: string;
	message?: string;
	isEmpty?: string;
    isActive?: boolean;
};

export default class ChatItem extends Block<Props> {
    constructor(props) {
        super(props);
    }

    static componentName = 'ChatItem';

	protected render(): string {
		
        let classActive: string = '';
        if (this.props.isActive) {
            classActive = 'chat-preview--active';
		}
		
		if (this.props.isEmpty) { 
			return `<div class="chat-preview ${classActive}">пустой чат</div>`
		}
		
        return `<div class="chat-preview ${classActive}">
		<div class="chat-preview__avatar">
			{{{Avatar image="${this.props.avatar}"}}}
		</div>
		<div class="chat-preview__body">
			<div class="chat-preview__title">
				{{{PersonName name="${this.props.personName}"}}}
				<time class="time__text chat-preview-info">${this.props.time}</time>
			</div>
			<div class="chat-preview__message">
				{{{MessagePreview message="${this.props.message}"}}}
				<span class="message-preview__unread-label chat-preview-info">1</span>
			</div>
		</div>
	</div>`;
    }
}
