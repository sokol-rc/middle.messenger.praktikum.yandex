import Block from 'core/Block';
import ChatApi from 'utils/api/chatApi';
import { Options } from 'utils/api/httptransport';
import isEmpty from 'utils/helpers/isEmpty';

import './chatList.css';

type Props = {
    some: any;
    chatsList: any;
    getChatsList: (options: Options) => void;
    onClick: (event: MouseEvent) => void;
    openDialog: (chatId: number) => void;
};

export default class ChatList extends Block<Props> {
    constructor(props: Props) {
		super(props);
		this.setProps({
			onClick: this.onClick.bind(this),
		})
    }

    componentDidMount(props: Props): Promise<void> {
        if (this.props.chatsList === null) {
            this.props.getChatsList({ limit: 10 });
        }
    }

    // хак, чтобы регистрировать HOC
	static componentName = 'ChatListContainer';
	
	onClick(event: MouseEvent) { 
		console.log(event.target);
		if (!event.currentTarget) {
			return;
		}
		const chatId = Number((event.currentTarget as HTMLDivElement).dataset.chatid);
		this.props.openDialog(chatId);
	}

	render(): string {
		const { chatsList, openedDialogId } = this.props;
        if (isEmpty(chatsList)) {
            return `<div class="chat-list"><div class="chat-list__inner">Нет чатов</div></div>`;
        }

		const chatsListArray = chatsList.map((chatList) => {
			const activeStatus = openedDialogId === chatList.id ? 'active' : '';
            if (chatList.lastMessage === null) {
                return `<div class="chat-list__item hr-bottom">{{{ChatItem isEmpty=true}}}</div>`;
			}
			const chatItem = `<div class="chat-list__item hr-bottom">{{{ChatItem 
				id="${chatList.id}"
				avatar="${chatList.avatar}"
				personName="${chatList.title}"
				time="${chatList.lastMessage.time}"
				message="${chatList.lastMessage.content}"
				isActive="${activeStatus}"
				onClick=onClick
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
