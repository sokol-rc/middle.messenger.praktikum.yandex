import Block from 'core/Block';
import messageReceivedSvg from '../../../assets/message-received.svg';
import messageReadedSvg from '../../../assets/message-readed.svg';
import messageTailOutSvg from '../../../assets/message-tail-out.svg';
import messageTailInSvg from '../../../assets/message-tail-in.svg';

interface InputProps {
    time: string;
    direction: string;
    label: string;
    className: string;
    target: string;
    messageReceived: boolean;
    messageReaded: boolean;
}

type Props = InputProps & {
	messageReceived: boolean;
	messageReaded: boolean;
}

export default class Message extends Block<Props> {
    constructor(props: InputProps) {
		super({
			...props,
			messageReceived: true,
            messageReaded: true,
		});
    }

    static componentName = 'Message';

    render(): string {
        let messageStatus: string = '';
        let directionClass: string = 'bubble-out';
        let isIncoming: boolean = false;
        let messageTailOut: string = `<img class="bubble__tail-out" src="${messageTailOutSvg}" />`;

        if (this.props.direction === 'incoming') {
            directionClass = 'bubble-in';
            isIncoming = true;
            messageTailOut = `<img class="bubble__tail-in" src="${messageTailInSvg}" />`;
        }

        if (this.props.messageReceived && !isIncoming) {
            messageStatus = `<img class="bubble__sending-status sending-status received" src="${messageReceivedSvg}" />`;
        }

        if (this.props.messageReaded && !isIncoming) {
            messageStatus = `<img class="bubble__sending-status sending-status readed" src="${messageReadedSvg}" />`;
        }

        return `
			<div class="bubbles-group">
				<div class="bubble ${directionClass}">
					<div class="bubble__inner">
						<div class="bubble__text">{{text}}
							<span class="bubble__time time">
								<time class="time__inner time__inner--font-size-s time__inner--font-style-italic">{{time}}</time>
								${messageStatus}
							</span>
						</div>
						${messageTailOut}
					</div>
				</div>
			</div>
`;
    }
}
