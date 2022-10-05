import Block from 'core/Block';

export default class ChatList extends Block<{}> {
    static componentName = 'ChatList';

    protected render(): string {
        return `<div class="chat-list">
		<div class="chat-list__inner">
			<div class="chat-list__item hr-bottom">
				{{{ChatItem}}}
			</div>
			<div class="chat-list__item hr-bottom">
				{{{ChatItem isActive=true}}}
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
