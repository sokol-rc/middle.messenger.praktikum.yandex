/* eslint-disable */
import Block from 'core/Block';
import './sidebar.css';

interface SidebarProps {
	isVisible?: boolean;
	toogleModal?: () => void;
}
export class Sidebar extends Block {
	constructor(props: SidebarProps) { 
		super(props);
		this.setProps({isVisible: true});
	}

	static componentName = 'Sidebar';
	
	toogleModal() { 
		this.props.toogleModal();
	}

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
					{{{Link
						href="/profile"
						label="Редактировать"
						className="chat-info__control-item chat-edit"
					}}}
					{{{Button
						label="Удалить чат"
						className="chat-info__control-item chat-delete button-text"
						onClick=toogleModal
					}}}
				</div>
			</div>
		</div>
	</aside>`;
    }
}
