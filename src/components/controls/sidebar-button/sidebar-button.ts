/* eslint-disable */
import Block from 'core/Block';

import './sidebar-button.css';

interface SidebarButtonProps { 
	onClick?: () => void;
}

export class SidebarButton extends Block {
	constructor({ ...props}: SidebarButtonProps) { 
		super({ ...props, events: {click: props.onClick} });
	}

    static componentName = 'SidebarButton';

    protected render(): string {
        return `<nav class="sidebar-button">
		<button class="sidebar-button__btn">
			<figure class="disk-menu-style"></figure>
			<figure class="disk-menu-style"></figure>
			<figure class="disk-menu-style"></figure>
		</button>
	</nav>`;
    }
}
