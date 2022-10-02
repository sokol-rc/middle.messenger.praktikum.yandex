/* eslint-disable */
import Block from 'core/Block';
import './sidebar.css';

export class Sidebar extends Block {

    static componentName = 'Sidebar';

	protected render(): string {

        return `<aside class="right-sidebar hr-left">
		<div class="right-sidebar__inner">
			<div class="chat-info">
				<div class="chat-info__description">
					{{{Avatar}}}
					{{{PersonName name="Дворник Частный"}}}
				</div>
				<div class="chat-info__control">
					<button class="chat-info__control-item chat-edit button-text" onclick="window.routing('/profile')">Редактировать</button>
					<button class="chat-info__control-item chat-delete button-text" onclick="window.modalConfirm.open()">Удалить чат</button>
				</div>
			</div>
		</div>
	</aside>`;
    }
}
