import Block from 'core/Block';
import { UserTransferedType } from 'reducers/transferedTypes';

import './navSidebar.css';

type Props = {
    user: UserTransferedType;
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
		let alt = 'пользователя';
		if (this.props.user !== null) { 
			avatar = this.props.user.avatar;
			alt = this.props.user.displayName;
		}
        
        return `<div class="nav-sidebar__inner nav-sidebar--bg-main">
		<div class="nav-sidebar__profile">
			<div class="profile-info">
				<div class="profile-info__avatar button-image">
					{{{Avatar image="${avatar}" alt="Аватар ${alt}"}}}
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
