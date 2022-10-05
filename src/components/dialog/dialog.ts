import Block from 'core/Block';
import getFormValues  from 'utils/formTools';
import { formValidate }  from 'utils/validate';
import * as sendIcon from '../../assets/send.svg';
import './dialog.css';

type IncomingProps = {
    toogleSidebar: () => void;
};

type Props = IncomingProps & {
    toogleSidebar: () => void;
    handleClick?: () => void;
    sendButtonClick?: (event: MouseEvent) => void;
};

export default class Dialog extends Block<Props> {
    constructor(props: IncomingProps) {
        super(props);
        this.setProps({
            handleClick: this.handleClick.bind(this),
            sendButtonClick: this.sendButtonClick.bind(this),
            toogleSidebar: this.props.toogleSidebar,
        });
    }

    static componentName = 'Dialog';

    handleClick() {
        this.props.toogleSidebar();
    }

    sendButtonClick(event: MouseEvent) {
        event.preventDefault();

        const messageInput: ValidateInput = this.refs.messageInputRef;

        formValidate([messageInput]);

        const formValues = getFormValues([messageInput]);
        console.log(formValues);
    }

    protected render(): string {
        return `
		<div class="dialog-window">
	<div class="dialog-window__inner">
		<div class="dialog-window__header dialog-header hr-bottom">
			<div class="dialog-header__profile hr-left">
				<div class="profile-info">
					<div class="profile-info__avatar">
						{{{Avatar}}}
					</div>
					<div class="profile-info__title">
						{{{PersonName name="Дейв Черный"}}}
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
			{{#DayContainer
				day="10 сентября"
			}}
		{{{Message
			time="14:40"
			text="Второе сообщение Второе сообщение Второе сообщение"
		}}}
		{{{Message
			time="14:40"
			text="Второе сообщение Второе сообщение Второе сообщение"
			direction="incoming"
		}}}
			{{/DayContainer}}
			</div>
		</div>
		<div class="dialog-window__controls hr-left">
			<div class="message-send">
				<form class="send-form" action="">
							{{{Input
								type="text"
								wrapperClassName="send-form__input-group send-form-input"
								labelClassName="send-form-input__label visually-hidden"
								className="send-form-input__input"
								name="message"
								label="Напишите здесь"
								placeholder="Напишите здесь..." 
								validateType="message"
								ref="messageInputRef"
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
