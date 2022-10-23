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
            toogleModal: this.toogleModal.bind(this),
            onConfirm: this.onConfirm.bind(this),
            onDecline: this.onDecline.bind(this),
            isVisible: true,
        });
	}

	componentDidMount(): void {
		if (isEmpty(this.props.user)) { 
			this.props.getUserInfo();
		}
	}

    toogleModal() {
        this.refs.ModalConfirmRef.setProps({
            isVisible: !(this.refs.ModalConfirmRef.getProps() as any).isVisible,
        });
    }

    onConfirm() {
        this.toogleModal();
    }

    onDecline() {
        this.toogleModal();
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
						{{{Sidebar 
							toogleModal=toogleModal
							ref="SidebarRef"
						}}}
					</div>
				</main>
				{{{ModalConfirm
					label="Удалить чат?"
					description="А вы уверены?"
					onConfirm=onConfirm
					onDecline=onDecline
					ref="ModalConfirmRef"
				}}}
			</div>
`;
    }
}

