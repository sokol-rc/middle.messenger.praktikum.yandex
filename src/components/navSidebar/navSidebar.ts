import Block from "core/Block";

import './navSidebar.css';

type Props = {
    user: any;
};
export default class NavSidebar extends Block<Props> {
    constructor(props) {
        super(props);
    }

    static componentName = 'NavSidebarContainer';

	render(): string {
		
		const avatar = this.props.user.avatar || '';
        return `<div class="nav-sidebar__inner nav-sidebar--bg-main">
		<div class="nav-sidebar__profile">
			<div class="profile-info">
				<div class="profile-info__avatar button-image"
					onclick="sidebarRight.toogle(event,'chat-page__right-sidebar')">
					{{{Avatar image="${avatar}"}}}
				</div>
			</div>
		</div>
	</div>
		`;
    }
}
