/* eslint-disable */
import Block from 'core/Block';
import personAvatar from '../../assets/avatar.png';

import './chat.css';

export class ChatPage extends Block {
    constructor() {
        super();
        this.setProps({
            toogleSidebar: this.toogleSidebar.bind(this),
        });
    }

    toogleSidebar() {
        this.refs.SidebarRef.setProps({
            isVisible: !this.refs.SidebarRef.getProps().isVisible,
        });
    }

    render() {
        return `
		<div>
		<main class="chat-page full-page">
	<nav class="nav-sidebar">
		<div class="nav-sidebar__inner nav-sidebar--bg-main">
			<div class="nav-sidebar__profile">
				<div class="profile-info">
					<div class="profile-info__avatar button-image" onclick ="sidebarRight.toogle(event,'chat-page__right-sidebar')">
						{{{Avatar image="${personAvatar}"}}}
					</div>
				</div>
			</div>
		</div>
	</nav>
	<section class="chat-page__list">
		{{{ChatList}}}
	</section>
	<section class="chat-page__dialog">
		{{{Dialog toogleSidebar=toogleSidebar}}}
	</section>
	<div class="chat-page__right-sidebar">
		{{{Sidebar ref="SidebarRef"}}}
	</div>
</main>
{{{ModalConfirm}}}
		</div>
`;
    }
}
