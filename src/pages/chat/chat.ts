import Block from 'core/Block';
import personAvatar from '../../assets/avatar.png';

import './chat.css';

type Props = {
    isVisible: any;
    toogleSidebar: () => void;
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
						<div class="nav-sidebar__inner nav-sidebar--bg-main">
							<div class="nav-sidebar__profile">
								<div class="profile-info">
									<div class="profile-info__avatar button-image"
										onclick="sidebarRight.toogle(event,'chat-page__right-sidebar')">
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
						{{{Dialog 
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
