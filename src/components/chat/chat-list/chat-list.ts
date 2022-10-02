/* eslint-disable */
import Block from 'core/Block';
import './chat-list.css';


export class ChatList extends Block {

    static componentName = 'ChatList';

    protected render(): string {
        return `<div class="chat-list">
		<div class="chat-list__inner">
			<div class="chat-list__item hr-bottom">
				{{{ChatItem}}}
			</div>
			<div class="chat-list__item hr-bottom chat-list__item--active">
				{{{ChatItem}}}
			</div>
			<div class="chat-list__item hr-bottom">
				{{{ChatItem}}}
			</div>
			<div class="chat-list__item hr-bottom">
				{{{ChatItem}}}
			</div>
			<div class="chat-list__item hr-bottom">
				{{{ChatItem}}}
			</div>
			<div class="chat-list__item hr-bottom">
				{{{ChatItem}}}
			</div>
		</div>
	</div>`;
    }
}
