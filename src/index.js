import Handlebars from "../node_modules/handlebars";
import { loginPageTemplate } from './pages/login/login.tmpl'
import { registrationPageTemplate } from './pages/registration/registration.tmpl';
import { chatPageTemplate } from './pages/chat/chat.tmpl';
import { profileTemplate } from './pages/profile/profile.tmpl'
import {notFoundPageTemplate} from './pages/404/404.tmpl';
import {serviceUnavailableTemplate} from './pages/500/500.tmpl';

import './partials/elements/person/avatar/avatar.tmpl';
import './partials/components/chat-list/chat-item/chat-item.tmpl'
import './partials/components/chat-list/chat-list.tmpl';
import './partials/elements/person/name/name.tmpl';
import './partials/elements/message/preview/preview.tmpl';
import './partials/components/dialog-window/dialog-window.tmpl';
import './partials/elements/controls/sidebar-button/sidebar-button.tmpl';
import './partials/components/right-sidebar/right-sidebar.tmpl';
import './partials/components/errors/error-page.tmpl';
import './partials/components/modal/modal-confirm.tmpl

const links = {
	'/login': loginPageTemplate,
	'/registration': registrationPageTemplate,
	'/': chatPageTemplate,
	'/profile': profileTemplate,
	'/404': notFoundPageTemplate,
	'/500': serviceUnavailableTemplate,
}
let html = '',
	template = '';

const routing = (route) => {
	let href = '';
	if (typeof route === 'string') {
		href = route;
	} else {
		href = document.location.pathname;
	}
	if (href in links) {
		template = Handlebars.compile(links[href]);
	} else {
		template = Handlebars.compile(links['/404']);
	}
	html = template();
	document.getElementById('root').innerHTML = html;

}
window.routing = routing;
window.addEventListener('load', routing);
