import Block from 'core/Block';
import './chat-item.css';

type Props = {
    id?: string;
    avatar?: string;
    personName?: string;
    time?: string;
    message?: string;
    isEmpty?: string;
    isActive?: string;
    events: {
        click: () => void;
    };
};

export default class ChatItem extends Block<Props> {
    constructor({ ...props }) {
        super({ ...props, events: { click: props.onClick } });
    }

    static componentName = 'ChatItem';

    protected render(): string {
        let classActive: string = '';
        let time = '';
        let messagePreview = '';
        if (this.props.isActive === 'active') {
            classActive = 'chat-preview--active';
        }

        if (typeof this.props.message !== 'undefined') {
            messagePreview = `{{{MessagePreview message="${this.props.message}"}}}
			<span class="message-preview__unread-label chat-preview-info">0</span>`;
        }
        if (typeof this.props.time !== 'undefined') {
            time = `<time class="time__text chat-preview-info">${this.props.time}</time>`;
        }

        return `<div class="chat-preview ${classActive}" data-chatid="${this.props.id}">
		<div class="chat-preview__avatar">
			{{{Avatar image="${this.props.avatar}" alt="Автара чата ${this.props.personName}"}}}
		</div>
		<div class="chat-preview__body">
			<div class="chat-preview__title">
				{{{PersonName name="${this.props.personName}"}}}
				${time}
			</div>
			<div class="chat-preview__message">
			${messagePreview}
			</div>
		</div>
	</div>`;
    }
}
