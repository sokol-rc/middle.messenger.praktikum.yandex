/* eslint-disable */
import Block from 'core/Block';
import './sidebar.css';

interface SidebarProps {
    isVisible?: boolean;
}
export class Sidebar extends Block {
	constructor(props: SidebarProps) { 
		super(props);
		this.setProps({isVisible: true});
	}

    static componentName = 'Sidebar';

	protected render(): string {
		let classVisible: string = '';
		if (this.props.isVisible) { classVisible = 'right-sidebar--opened'}

        return `<aside class="right-sidebar hr-left ${classVisible}">
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
