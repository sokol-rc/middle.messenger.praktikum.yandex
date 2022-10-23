import Block from 'core/Block';
import ChatApi from 'utils/api/chatApi';
import { Options } from 'utils/api/httptransport';

import './chatList.css';

type Props = {
    some: any;
    chatsList: any;
    getChatsList: (options: Options) => void;
};

export default class ChatList extends Block<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount(props: Props): Promise<void> {
        if (this.props.chatsList === null) {
            this.props.getChatsList({ limit: 10 });
        }
    }

    // хак, чтобы регистрировать HOC
    static componentName = 'ChatListContainer';

    protected render(): string {
        if (!this.props.chatsList) {
            return `<div class="chat-list"><div class="chat-list__inner">Нет чатов</div></div>`;
        }

        const chatsListArray = this.props.chatsList.map((chatList) => {
            if (chatList.lastMessage === null) {
                return `<div class="chat-list__item hr-bottom">{{{ChatItem isEmpty=true}}}</div>`;
            }
            const chatItem = `<div class="chat-list__item hr-bottom">{{{ChatItem 
				avatar="${chatList.avatar}"
				personName="${chatList.title}"
				time="${chatList.lastMessage.time}"
				message="${chatList.lastMessage.content}"
			}}}</div>`;
            return chatItem;
        });

        return `<div class="chat-list">
		{{{Loader isLoading=isLoading}}}
		<div class="chat-list__inner">
		${chatsListArray.join('')}
		</div>
	</div>`;
    }
}
