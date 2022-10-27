import Block from 'core/Block';
import getFormValues from 'utils/formTools';
import { getMessageTimeFromDate } from 'utils/helpers/dateTime';
import isEmpty from 'utils/helpers/isEmpty';
import { getMessageDirection } from 'utils/helpers/messageTools';
import { inputValidate } from 'utils/validate/validate';
import Patterns from 'utils/validate/validate-pattenrs';
import * as sendIcon from '../../assets/send.svg';
import './dialog.css';

const ENTER_KEY_CODE = 'Enter';

type Props = {
    handleClick?: () => void;
    toogleSidebar: () => void;
    createWebSocketConnection: () => void;
    _showError: () => void;
    _clearError: () => void;
    sendMessage: (message: any) => void;
    sendButtonClick?: (event: MouseEvent) => void;
    validateOnBlur: (input: ValidateInput) => void;
    validateOnFocus: (input: ValidateInput) => void;
    onInput: () => void;
    onKeydown: (event: KeyboardEvent) => void;
    messagePattern: RegExp;
    isLoading: boolean;
    user: any;
};

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
        if (!chatListLoaded) {
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
        dialogScrollableDiv?.classList.add('scroll-y');
        dialogScrollableDiv.scrollTop = dialogScrollableDiv.scrollHeight;
        this.refs.messageInputRef.element?.focus();
    }

    onInput(): void {
        const currentValue: string =
            this.refs.messageInputRef.element.innerText;
        this._checkValidate({
            value: currentValue,
            pattern: this.patterns.messagePattern,
        });
    }

    onKeydown(event: KeyboardEvent): void {
        if (event.code === ENTER_KEY_CODE && event.shiftKey === false) {
            event.stopPropagation();
            event.preventDefault();
            this._submit();
        }
    }


    _checkValidate(inputObject) {
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
        const currentValue: string =
            this.refs.messageInputRef.element.innerText;

        const isValid = this._checkValidate({
            value: currentValue,
            pattern: this.patterns.messagePattern,
        });
        if (isValid) {
            this._sendMessage(currentValue);
        }
    }

    _sendMessage(message: string) {
        this.props.sendMessage({
            message,
            socket: this.props.openedDialog.socket,
        });
    }

    render(): string {
        const { user, openedDialog, chatListLoaded, messagesLoaded } =
            this.props;
        if (!chatListLoaded && !messagesLoaded) {
            return `{{{Loader isLoading=isLoading}}}`;
        }

        const chatName = openedDialog.chatInfoObject.title;
        const chatAvatar = openedDialog.chatInfoObject.avatar;
        const daysArray = openedDialog.days.map((day) => {
            const messagesArray = day.messages.map((message) => {
                const time = getMessageTimeFromDate(message.time);
                const direction = getMessageDirection(message.userId, user.id);
                let userName = '';
                if (typeof openedDialog.usersDisplayName !== 'undefined') {
                    userName = openedDialog.usersDisplayName.find(
                        (u) => u.userId === message.userId
                    ).userDisplayName;
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
				<div class="profile-info">
					<div class="profile-info__avatar">
						{{{Avatar image="${chatAvatar}"}}}
					</div>
					<div class="profile-info__title">
						{{{PersonName name="${chatName}"}}}
						<span class="profile-info__status profile-status">Онлайн</span>
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
				{{{DivLikeInput
					className="send-form-input__input"
					placeholder="Напишите здесь..."
					onInput=onInput
					onKeydown=onKeydown
					onPaste=onPaste
					ref="messageInputRef"
				}}}
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

// {{{Input
// 	type="text"
// 	wrapperClassName="send-form__input-group send-form-input"
// 	labelClassName="send-form-input__label visually-hidden"
// 	className="send-form-input__input"
// 	name="message"
// 	label="Напишите здесь"
// 	placeholder="Напишите здесь..."
// 	validateOnBlur=validateOnBlur
// 	validateOnFocus=validateOnFocus
// 	pattern=messagePattern
// 	errorMessage="не пустое"
// 	inputType="textarea"
// 	ref="messageInputRef"
// }}}
