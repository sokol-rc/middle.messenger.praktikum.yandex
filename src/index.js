import Handlebars from 'handlebars';
import {loginPageTemplate} from './pages/login/login.tmpl'
import {registrationPageTemplate} from './pages/registration/registration.tmpl';
import {chatPageTemplate} from './pages/chat/chat.tmpl';

import './partials/header.tmpl';
import './partials/footer.tmpl';
import './partials/components/avatar/avatar.tmpl';
import './partials/components/chat-list/chat-item/chat-item.tmpl'
import './partials/components/chat-list/chat-list.tmpl';
import './partials/elements/person/name/name.tmpl';
import './partials/elements/message/preview/preview.tmpl';
import './partials/components/dialog-window/dialog-window.tmpl';

const template = Handlebars.compile(chatPageTemplate);
// execute the compiled template and print the output to the console

const html = template();
document.getElementById('root').innerHTML = html;