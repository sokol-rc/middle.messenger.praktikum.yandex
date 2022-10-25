import Block from 'core/Block';
import isEmpty from 'utils/helpers/isEmpty';
import './chat.css';

type Props = {
    isVisible: any;
    user: any;
    toogleSidebar: () => void;
    getUserInfo: () => void;
    toogleModal: () => void;
    onConfirm: () => void;
    onDecline: () => void;
};

export default class ChatPage extends Block<Props> {
    constructor(props: Props) {
        super(props);
        this.setProps({
            toogleSidebar: this.toogleSidebar.bind(this),
            isVisible: true,
        });
	}

	componentDidMount(): void {
		if (isEmpty(this.props.user)) { 
			this.props.getUserInfo();
		}
	}

    toogleSidebar() {
        this.refs.SidebarRef.setProps({
            isVisible: !(this.refs.SidebarRef.getProps() as any).isVisible,
        });
    }

	render() {
        return `
			<div>
				<main class="chat-page full-page">
					<nav class="nav-sidebar">
						{{{NavSidebarContainer}}}
					</nav>
					<section class="chat-page__list">
						{{{ChatListContainer}}}
					</section>
					<section class="chat-page__dialog">
						{{{DialogContainer 
							toogleSidebar=toogleSidebar
						}}}
					</section>
					<div class="chat-page__right-sidebar">
						{{{SideBarContainer 
							toogleModal=toogleModal
							ref="SidebarRef"
						}}}
					</div>
				</main>
			</div>
`;
    }
}

