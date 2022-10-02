/* eslint-disable */
import Block from 'core/Block';
import './chat-item.css';
import personAvatar from '../../../assets/avatar.png';

interface ChatItemProps { 
	isActive?: boolean
}

export class ChatItem extends Block {
	constructor(props: ChatItemProps) { 
		super(props);
	}

    static componentName = 'ChatItem';

	protected render(): string {
		
		let classActive: string = '';
		if (this.props.isActive) { classActive = 'chat-preview--active' }
		
        return `<div class="chat-preview ${classActive}">
		<div class="chat-preview__avatar">
			{{{Avatar image="${personAvatar}"}}}
		</div>
		<div class="chat-preview__body">
			<div class="chat-preview__title">
				{{{PersonName name="Дейв Черный"}}}
				<span class="time__text chat-preview-info">14:45</span>
			</div>
			<div class="chat-preview__message">
				{{{MessagePreview}}}
				<span class="message-preview__unread-label chat-preview-info">1</span>
			</div>
		</div>
	</div>`;
    }
}
