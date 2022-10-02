/* eslint-disable */
import Block from 'core/Block';
import personAvatar from '../../assets/avatar.png';

import './chat.css';

export class ChatPage extends Block {
	
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
		{{{Dialog}}}
	</section>
	<div class="chat-page__right-sidebar chat-page__right-sidebar--hidden right-sidebar">
		{{{Sidebar}}}
	</div>
</main>
{{{ModalConfirm}}}
		</div>
`;
    }
}
