import Block from 'core/Block';
import { DialogType } from 'core/store/initial-store';
import './sidebar.css';

interface Props {
    isVisible: boolean;
    isVisibleModal: boolean;
    chatsListLoaded: boolean;
    openedDialogId: number;
    toogleModal: () => void;
    onConfirm: () => void;
    onDecline: () => void;
    deleteChat: (openedDialogId: number) => void;
    openedDialog: DialogType;
}
export default class Sidebar extends Block<Props> {
    constructor(props: Props) {
        super({ ...props, isVisible: true });
        this.setProps({
            toogleModal: this.toogleModal.bind(this),
            onConfirm: this.onConfirm.bind(this),
            onDecline: this.onDecline.bind(this),
            isVisibleModal: false,
        });
    }

    static componentName = 'SideBarContainer';

    toogleModal() {
        this.setProps({ isVisibleModal: true });
    }

    onConfirm() {
        this.props.deleteChat(this.props.openedDialogId);
        this.setProps({ isVisibleModal: false });
    }

    onDecline() {
        this.setProps({ isVisibleModal: false });
    }

    protected render(): string {
        const { chatsListLoaded, openedDialog } = this.props;
        if (!chatsListLoaded) {
            return '<div></div>';
        }
        let classVisible: string = '';
        if (this.props.isVisible) {
            classVisible = 'right-sidebar--opened';
        }

        return `<aside class="right-sidebar hr-left ${classVisible}">
		<div class="right-sidebar__inner">
			<div class="chat-info">
				<div class="chat-info__description">
					{{{Avatar image="${openedDialog.chatInfoObject.avatar}" alt="Аватар чата ${openedDialog.chatInfoObject.title}"}}}
					{{{PersonName name="${openedDialog.chatInfoObject.title}"}}}
				</div>
				<div class="chat-info__control">
					{{{Button
						label="Удалить чат"
						className="chat-info__control-item chat-delete button-text"
						onClick=toogleModal
					}}}
				</div>
			</div>
		</div>
		{{{ModalConfirm
			label="Удалить чат?"
			description="А вы уверены?"
			onConfirm=onConfirm
			onDecline=onDecline
			isVisible=isVisibleModal
			ref="ModalConfirmRef"
		}}}
	</aside>`;
    }
}
