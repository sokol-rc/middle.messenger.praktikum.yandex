/* eslint-disable */
import Block from 'core/Block';

import './sidebar-button.css';



export class SidebarButton extends Block {

    static componentName = 'SidebarButton';

    protected render(): string {
        return `<nav class="sidebar-button">
		<button class="sidebar-button__btn" onclick ="sidebarRight.toogle(event,'chat-page__right-sidebar')">
			<figure class="disk-menu-style"></figure>
			<figure class="disk-menu-style"></figure>
			<figure class="disk-menu-style"></figure>
		</button>
	</nav>`;
    }
}
