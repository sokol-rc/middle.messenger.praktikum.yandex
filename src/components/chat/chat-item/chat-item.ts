import Block from 'core/Block';
import './chat-item.css';
import personAvatar from '../../../assets/avatar.png';

type Props = {
	isActive: boolean
}


export default class ChatItem extends Block<Props> {

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
				<time class="time__text chat-preview-info">14:45</time>
			</div>
			<div class="chat-preview__message">
				{{{MessagePreview}}}
				<span class="message-preview__unread-label chat-preview-info">1</span>
			</div>
		</div>
	</div>`;
    }
}
