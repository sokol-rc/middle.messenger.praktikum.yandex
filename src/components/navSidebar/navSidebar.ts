import Block from 'core/Block';

import './navSidebar.css';

type Props = {
    user: any;
    doLogout: () => void;
    onLogout: () => void;
};
export default class NavSidebar extends Block<Props> {
    constructor(props: Props) {
        super(props);
        this.setProps({
            onLogout: this.onLogout.bind(this),
        });
    }

    static componentName = 'NavSidebarContainer';

    onLogout() {
        this.props.doLogout();
    }

	render(): string {
		let avatar = '';
		if (this.props.user !== null) { 
			avatar = this.props.user.avatar || '';
		}
        
        return `<div class="nav-sidebar__inner nav-sidebar--bg-main">
		<div class="nav-sidebar__profile">
			<div class="profile-info">
				<div class="profile-info__avatar button-image">
					{{{Avatar image="${avatar}"}}}
				</div>
				<div class="profile-info__control">
					{{{Link
						href="/settings"
						label="Редактировать"
						className="profile-info__control-item"
					}}}
					{{{Button label="Выйти" onClick=onLogout}}}
				</div>
			</div>
		</div>
	</div>
		`;
    }
}
