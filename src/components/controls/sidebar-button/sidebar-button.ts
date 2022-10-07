import Block from 'core/Block';

import './sidebar-button.css';

type IncomingProps = {
    onClick?: () => void;
};
interface Props {
    events?: {
        click?: () => void;
    };
}

export default class SidebarButton extends Block<Props> {
    constructor({ ...props }: IncomingProps) {
        super({ ...props, events: { click: props.onClick } });
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
