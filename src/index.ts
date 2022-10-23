import Router from 'core/routing/router';
import { Store } from 'core/store/store';
import initialStore from 'core/store/initial-store';
import { initRouter } from 'services/initApp';
import { registerComponent } from './core';

import Button from './components/controls/button';
import Input from './components/input';
import InputInner from './components/input/input-inner/input-inner';
import InputError from './components/input/input-error/input-error';
import Avatar from './components/person/avatar/avatar';
import Error from './components/error/error';
import ChatList from './components/chat/chat-list';
import ChatListContainer from './components/chat/chat-list/chatListContainer';
import ChatItem from './components/chat/chat-item/chat-item';
import PersonName from './components/person/person-name';
import MessagePreview from './components/message/message-preview';
import SidebarButton from './components/controls/sidebar-button/sidebar-button';
import Sidebar from './components/sidebar';
import ModalConfirm from './components/modals/modal-confirm';
import Dialog from './components/dialog';
import DialogContainer from './components/dialog/dialogContainer';
import Form from './components/form';
import Link from './components/controls/link';
import DayContainer from './components/message/day-container';
import Message from './components/message/message';
import Loader from './components/loader';
import NavSidebar from './components/navSidebar';
import NavSidebarContainer from './components/navSidebar/navSidebarContainer';

import './styles/common/default.css';
import './styles/common/common.css';
import { authReducer } from './reducers/authReducer';

require('babel-core/register');

registerComponent(Button);
registerComponent(Input);
registerComponent(InputInner);
registerComponent(InputError);
registerComponent(Error);
registerComponent(Avatar);
registerComponent(ChatList);
registerComponent(ChatListContainer);
registerComponent(ChatItem);
registerComponent(PersonName);
registerComponent(Dialog);
registerComponent(DialogContainer);
registerComponent(MessagePreview);
registerComponent(SidebarButton);
registerComponent(Sidebar);
registerComponent(ModalConfirm);
registerComponent(Form);
registerComponent(Link);
registerComponent(DayContainer);
registerComponent(Message);
registerComponent(Loader);
registerComponent(NavSidebar);
registerComponent(NavSidebarContainer);






document.addEventListener('DOMContentLoaded', () => {
	const store = new Store<any>(initialStore, authReducer);
	const router = new Router('.app');
	
	
	window.store = store;
	window.router = router;
	
		store.on('changed', (prevState, nextState) => {
			  console.log(
				'%cstore updated',
				'background: #222; color: #7B68EE',
				nextState,
			  );
		});

	// store.dispatch(initApp);
	initRouter(router, store);
});
// document.addEventListener('DOMContentLoaded', routing);

// const links: { [x: string]: any } = {
//     '/login': LoginPage,
//     '/registration': RegistrationPage,
//     '/': ChatPage,
//     '/profile': ProfilePage,
//     '/404': ErrorPage,
// };
// const routing = (route: string | Event) => {
//     let href: string = '';
//     if (typeof route === 'string') {
//         href = route;
//     } else {
//         href = document.location.pathname;
//     }
//     if (href in links) {
//         renderDOM(new links[href]());
//     } else if (href === '/500') {
//         renderDOM(new links['/404']({ errorNumber: 500 }));
//     } else {
//         renderDOM(new links['/404']({ errorNumber: 404 }));
//     }
// };

// (window as any).routing = routing;
