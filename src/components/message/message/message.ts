/* eslint-disable */
import Block from 'core/Block';
import messageReceivedSvg from '../../../assets/message-received.svg';
import messageReadedSvg from '../../../assets/message-readed.svg';

interface InputProps {
    time: string;
    label?: string;
    className?: string;
    target?: string;
    messageReceived?: boolean;
    messageReaded?: boolean;
}

export class Message extends Block {
    constructor(props: InputProps) {
        super(props);

        this.setProps({
            messageReceived: true,
            messageReaded: true,
        });
    }
    static componentName = 'Message';

    render(): string {
        let messageStatus: string = '';

        if (this.props.messageReceived) {
            messageStatus = `<img class="bubble__sending-status sending-status received" src="${messageReceivedSvg}" />`;
		}
		
		if (this.props.messageReaded) {
            messageStatus = `<img class="bubble__sending-status sending-status readed" src="${messageReadedSvg}" />`;
        }

        return `
			<div class="bubbles-group">
				<div class="bubble bubble-out">
					<div class="bubble__inner">
						<div class="bubble__text">{{text}}
							<span class="bubble__time time">
								<time class="time__inner time__inner--font-size-s time__inner--font-style-italic">{{time}}</time>
								${messageStatus}
							</span>
						</div>

						<svg class="bubble__tail-out" width="20" height="13" viewBox="0 0 20 13" fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M20 13H0.0446164C1.47 13 7.10095 -7.31267 10.735 2.84388C14.369 13.0004 19.3743 12.4839 20 13Z" />
						</svg>
					</div>
				</div>
			</div>
`;
    }
}
