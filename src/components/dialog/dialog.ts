import Block from 'core/Block';
import { DialogType } from 'core/store/initial-store';
import { SendMessageType } from 'reducers/thunkTypes';
import { UserTransferedType } from 'reducers/transferedTypes';
import { getMessageTimeFromDate } from 'utils/helpers/dateTime';
import { getMessageDirection } from 'utils/helpers/messageTools';
import { inputValidate } from 'utils/validate/validate';
import Patterns from 'utils/validate/validate-pattenrs';
import { ValidationHandlers } from 'utils/validate/validateTypes';
import * as sendIcon from '../../assets/send.svg';
import './dialog.css';

type Props = {
    handleClick?: () => void;
    toogleSidebar: () => void;
    createWebSocketConnection: (openedDialogId: number) => void;
    _showError: () => void;
    _clearError: () => void;
    closeSocket: (openedDialog: DialogType) => void;
    sendMessage: (message: SendMessageType) => void;
    getMessages: (openedDialogId: number) => void;
    sendButtonClick?: (event: MouseEvent) => void;
    onInput: () => void;
    onKeydown: (event: KeyboardEvent) => void;
    messagePattern: RegExp;
    isLoading: boolean;
    chatListLoaded: boolean;
    messagesLoaded: boolean;
    errorMessage: string;
    openedDialogId: number;
    openedDialog: DialogType | null;
    user: UserTransferedType;
} & ValidationHandlers;

export default class Dialog extends Block<Props> {
    constructor(props: Props) {
        super(props);
        this.setProps({
            handleClick: this.handleClick.bind(this),
            sendButtonClick: this.sendButtonClick.bind(this),
            toogleSidebar: this.props.toogleSidebar,
            onInput: this.onInput.bind(this),
            onKeydown: this.onKeydown.bind(this),
            errorMessage: 'Не должен быть пустым',
        });
    }

    static componentName = 'DialogContainer';

    protected messageInputHeight = 50;

    protected currentDialogId = 0;

    protected patterns = Patterns;

    handleClick() {
        this.props.toogleSidebar();
	}

    componentDidMount(): void {
        const {
            chatListLoaded,
            getMessages,
            openedDialogId,
            openedDialog,
            createWebSocketConnection,
        } = this.props;
        if (!chatListLoaded || openedDialog === null) {
            return;
		}
		
        if (openedDialog.socket === null) {
            createWebSocketConnection(openedDialogId);
		}
		if (!openedDialog.messagesLoaded) {
            getMessages(openedDialogId);
        }
        const dialogScrollableDiv = document.querySelector(
            '.dialog-scrollable-content'
        );
        if (dialogScrollableDiv !== null) {
            dialogScrollableDiv.classList.add('scroll-y');
            dialogScrollableDiv.classList.add('scroll-theme');
            dialogScrollableDiv.scrollTop = dialogScrollableDiv.scrollHeight;
        }

        if (this.refs.messageInputRef) {
            this.refs.messageInputRef.element?.focus();
		}
		this.currentDialogId = openedDialogId;
    }

    onInput(): void {
        const messageInputElem = this.refs.messageInputRef.element;
        const messageInputFakeElem = this.refs.messageInputFakeRef.element;
        if (messageInputElem === null || messageInputFakeElem === null) {
            return;
        }
        const currentValue: string = messageInputElem.innerText;

        messageInputFakeElem.textContent = currentValue;

        this._checkValidate({
            value: currentValue,
            pattern: this.patterns.messagePattern,
        });
        const newHeight = messageInputFakeElem.scrollHeight;

        if (this.messageInputHeight !== newHeight) {
            this.messageInputHeight = newHeight;
            if (newHeight > 110) {
                if (!messageInputElem.classList.contains('scroll-y')) {
                    messageInputElem.classList.add('scroll-y');
                }
            } else {
                if (messageInputElem.classList.contains('scroll-y')) {
                    messageInputElem.classList.remove('scroll-y');
                }
                messageInputElem.style.height = `${newHeight}px`;
            }
        }
    }

    onKeydown(event: KeyboardEvent): void {
        if (event.code === 'Enter' && event.shiftKey === false) {
            event.stopPropagation();
            event.preventDefault();
            this._submit();
        }
    }

    _checkValidate(inputObject: ValidateInput) {
        const isValid: boolean = inputValidate(inputObject);

        if (!isValid) {
            this._showError();
        } else {
            this._clearError();
        }
        return isValid;
    }

    _showError(): void {
        this.refs.errorRef.setProps({ isShowed: true });
    }

    _clearError(): void {
        this.refs.errorRef.setProps({ isShowed: false });
    }

    sendButtonClick(event: MouseEvent) {
        event.preventDefault();
        this._submit();
    }

    _submit(): void {
        const currentValue: string | undefined =
            this?.refs?.messageInputRef?.element?.innerText;

        const isValid = this._checkValidate({
            value: currentValue,
            pattern: this.patterns.messagePattern,
        });
        if (isValid && typeof currentValue !== 'undefined') {
            this._sendMessage(currentValue);
        }
    }

    _sendMessage(message: string) {
        if (this.props.openedDialog !== null) {
            this.props.sendMessage({
                message,
                socket: this.props.openedDialog.socket as WebSocket,
            });
        }
    }

    render(): string {
        const { user, openedDialog, chatListLoaded, messagesLoaded } =
            this.props;
        if ((!chatListLoaded && !messagesLoaded) || openedDialog === null) {
            return `<div class="dialog__stub">Заглушка. Диалогов нет</div>`;
        }

        const chatName = openedDialog.chatInfoObject.title;
        const chatAvatar = openedDialog.chatInfoObject.avatar;
        const daysArray = openedDialog.days.map((day) => {
            const messagesArray = day.messages.map((message) => {
                const time = getMessageTimeFromDate(message.time);
                const direction = getMessageDirection(message.userId, user.id);

                let userName = '';

                if (
                    typeof openedDialog.usersDisplayName !== 'undefined' &&
                    openedDialog.usersDisplayName !== null
                ) {
                    const userNameFound = openedDialog?.usersDisplayName?.find(
                        (u) => u.userId === message.userId
                    )?.userDisplayName;
                    if (userNameFound && typeof userName !== 'undefined') {
                        userName = userNameFound;
                    }
                }

                return `{{{Message
						time="${time}"
						text="${message.content}"
						direction="${direction}"
						messageReaded=true
						userDisplayName="${userName}"
					}}}`;
            });
            return `{{#DayContainer
						day="${day.dayText}"
					}}
					${messagesArray.join('')}
					{{/DayContainer}}`;
        });

        return `
		<div class="dialog-window">
	<div class="dialog-window__inner">
		<div class="dialog-window__header dialog-header hr-bottom">
			<div class="dialog-header__profile hr-left">
				<div class="dialog-window__chat-info">
					<div class="chat-info__avatar">
						{{{Avatar image="${chatAvatar}" alt="Аватар чата ${chatName}"}}}
					</div>
					<div class="chat-info__title">
						{{{PersonName name="${chatName}"}}}
						<span class="chat-info__status profile-status">Онлайн</span>
					</div>
				</div>
			</div>
			<div class="dialog-header__control">
				{{{SidebarButton onClick=handleClick}}}
			</div>
		</div>
		<div class="dialog-window__body dialog-window__body--bg-dialog hr-bottom">
			<div class="dialog-scrollable-content">
			${daysArray.join('')}
			</div>
		</div>
		<div class="dialog-window__controls hr-left">
			<div class="message-send">
				<form class="send-form" action="">
				<div class="send-form__wrapper">
					{{{DivLikeInput
						className="send-form-input__input"
						placeholder="Напишите здесь..."
						onInput=onInput
						onKeydown=onKeydown
						onPaste=onPaste
						ref="messageInputRef"
					}}}
					{{{DivLikeInput
						className="send-form-input__input fake-input"
						ref="messageInputFakeRef"
					}}}
				</div>

				{{{InputError
					errorMessage="${this.props.errorMessage}"
					ref="errorRef"
				}}}
					<div class="send-form__submit">
						<div class="send-message-control">
						{{{Button
							label="<span class=\\"send-icon\\"><img src=\\"${sendIcon}\\" alt=\\"\\"></span>"
							onClick=sendButtonClick
						}}}
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>`;
    }
}
